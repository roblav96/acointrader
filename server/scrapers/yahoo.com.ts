//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import nodestream from 'stream'
import nodehttp from 'http'
import fs from 'fs'
import axios from 'axios'
import moment from 'moment'
import jsonic from 'jsonic'
import trumpet from 'trumpet'
import pdelay from 'delay'
import pevent from 'p-event'
import pforever from 'p-forever'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'
import * as forex from '../services/forex'



export function getFiatQuotes(symbols: string[]) {
	return Promise.resolve().then(function() {
		return http.get('https://query1.finance.yahoo.com/v7/finance/quote', {
			symbols: symbols.join(','),
		}, { silent: true })

	}).then(function(response) {
		let fxquotes = response.quoteResponse.result as Array<Yahoo.Quote>
		let items = fxquotes.filter(v => !!v).map(function(fxquote) {
			let pair = fxquote.symbol.split('=').shift()
			return {
				pair,
				base: pair.replace(fxquote.currency, ''),
				quote: fxquote.currency,
				symbol: fxquote.symbol,
				name: fxquote.shortName,
				exchange: fxquote.exchange,
				bidPrice: fxquote.bid,
				bidSize: fxquote.bidSize,
				askPrice: fxquote.ask,
				askSize: fxquote.askSize,
				price: fxquote.regularMarketPrice,
				change: fxquote.regularMarketChange,
				changePercent: fxquote.regularMarketChangePercent,
				updated: fxquote.regularMarketTime * 1000,
				stamp: Date.now(),
			} as Items.FiatQuote
		})
		items.forEach(shared.object.compact)

		let coms = items.map(v => ['hmset', 'fiats:' + v.pair, v])
		return redis.pipelinecoms(coms as any)

	}).catch(function(error) {
		console.error('syncForexQuotes > error', errors.render(error))
		return Promise.resolve()
	})
}





// let stream = new yahoo.Streamer(
// 	// ['USDCNY=X', 'USDGBP=X', 'USDJPY=X'],
// 	['EURUSD=X'],
// 	'-1',
// 	function(squotes) {
// 		console.log('squotes >')
// 		eyes.inspect(squotes)
// 		console.log('squotes.length', squotes.length)
// 	}
// )

export class Streamer {

	private static KEYS = {
		a00: 'ask',
		a50: 'asksize',
		b00: 'bid',
		b60: 'bidsize',
		c10: 'change',
		c63: 'changerealtime',
		c64: 'disputedchangerealtimeafterhours',
		c85: 'changerealtimeafterhours',
		c86: 'percentchangerealtimeafterhours2',
		g53: 'daylow',
		h53: 'dayhigh',
		j10: 'marketcap',
		l10: 'lastsaleprice',
		l84: 'pricerealtime',
		l86: 'pricerealtimeafterhours',
		p20: 'percentchange',
		p43: 'percentchangerealtime',
		p44: 'percentchangerealtimeafterhours',
		t10: 'lastsaletime',
		t53: 'disputedtimestampforcommodities',
		t54: 'disputedtimestampforstocks',
		v53: 'volume',
	}
	private static MAP = _.invert(Streamer.KEYS) as Dict<string>

	private static onTrumpet(span, fn: (squotes: Yahoo.StreamQuote[]) => void) {
		let chunked = ''
		let rs = span.createReadStream() as fs.ReadStream
		rs.on('data', chunk => chunked += chunk)
		rs.on('end', () => {
			rs.unpipe()
			rs.removeAllListeners()
			rs = null

			let input = chunked.toString()
			let jsons = [] as Array<{ [symbol: string]: { [idk_key: string]: string } }>
			let sqmap = {} as { [symbol: string]: Yahoo.StreamQuote }

			let split = input.split('yfs_u1f(')
			split.shift()
			split.forEach(function(v) {
				let parsed = v.substring(0, v.indexOf(');}'))
				if (!parsed) return console.error('YahooStreamer rs.on.end !parsed > v', v);
				jsons.push(jsonic(parsed))
			})

			jsons.forEach(function(item) {
				Object.keys(item).forEach(function(symbol, i) {
					if (i > 1) console.warn('YahooStreamer i > 1', item);
					if (!sqmap[symbol]) sqmap[symbol] = {} as any;
					let data = item[symbol]
					Object.keys(data).forEach(function(skey) {
						let value = data[skey]
						if (!isNaN(value as any)) {
							value = Number.parseFloat(value) as any
						} else if (value.indexOf(',') >= 0) {
							value = Number.parseInt(value.split(',').join('')) as any
						} else if (skey == Streamer.MAP['marketcap']) {
							let by = value.slice(-1).toUpperCase()
							let num = Number.parseFloat(value.slice(0, -1))
							if (by == 'T') num = num * 1000000000000;
							else if (by == 'B') num = num * 1000000000;
							else if (by == 'M') num = num * 1000000;
							else if (by == 'K') num = num * 1000;
							value = num as any
						}
						let key = Streamer.KEYS[skey]
						sqmap[symbol][key] = value
					})
				})
			})

			if (_.isEmpty(sqmap)) return;
			fn(Object.keys(sqmap).map(function(symbol) {
				let squote = sqmap[symbol]
				squote.symbol = symbol
				return squote
			}))

		})
	}

	tr: nodestream.Duplex & { selectAll: any }
	req: nodehttp.IncomingMessage
	canceler: AxiosCanceler

	constructor(
		private symbols: Array<string>,
		private id: string,
		private fn: (squotes: Yahoo.StreamQuote[]) => void,
	) {
		pforever(() => this.start())
	}

	initing = true
	resetiniting() { this.initing = false }
	_resetiniting = _.throttle(this.resetiniting, 1000, { leading: false, trailing: true })

	destroy() {
		this.initing = true
		this.canceler = null
		if (this.tr) {
			this.tr.unpipe()
			this.tr.removeAllListeners()
			this.tr.end()
			this.tr = null
		}
		if (this.req) {
			this.req.unpipe()
			this.req.removeAllListeners()
			this.req.destroy(new Error())
			this.req = null
		}
	}

	start(): Promise<any> {
		this.destroy()

		this.tr = trumpet()
		this.tr.selectAll('script', span => {
			// if (this.initing) return this._resetiniting();
			Streamer.onTrumpet(span, this.fn)
		})

		return axios.get('https://streamerapi.finance.yahoo.com/streamer/1.0', {
			headers: {
				'Host': 'streamerapi.finance.yahoo.com',
				'Accept': '*/*',
				'Accept-Encoding': 'deflate, gzip, br',
				'Connection': 'keep-alive',
			},
			params: {
				s: this.symbols.join(','),
				k: Object.keys(Streamer.KEYS).join(','),
				// s: 'BTC-USD,CL=F,EUR=X,EURUSD=X,GBPUSD=X,GC=F,JPY=X,SI=F',
				// s: 'USDGBP=X',
				// k: 'a00,a50,b00,b60,h53,g53,c64,p44,l86,t54,c63,p43,h53,g53,l84,t53,v53',
				// k: 'l10,t10',
				callback: 'parent.yfs_u1f',
				mktmcb: 'parent.yfs_mktmcb',
				gencallback: 'parent.yfs_gencb',
				mu: '1',
				lang: 'en-US',
				region: 'US',
				localize: '0',
			},
			responseType: 'stream',
			cancelToken: new axios.CancelToken(canceler => this.canceler = canceler),

		}).then(({ data }) => {
			this.req = data
			console.info('[' + this.id + '] yahoo streamer connected', this.symbols.length)

			return new Promise((resolve, reject) => {
				this.req.on('error', error => {
					console.error('[' + this.id + '] yahoo streamer req.on.error > error', errors.render(error as any))
					resolve()
				})
				this.req.on('end', () => {
					console.warn('[' + this.id + '] yahoo streamer req.on.end')
					resolve()
				})
				this.req.pipe(this.tr)
			})

		}).catch(error => {
			if (error) console.error('[' + this.id + '] yahoo streamer axios catch > error', errors.render(error));
			return Promise.resolve()

		}).then(() => {
			if (this.canceler) {
				this.canceler()
				this.canceler = null
			}
			this.destroy()
			return pevent(process.ee3, shared.enums.EE3.TICK_15)

		})
	}

}







declare global {
	namespace Yahoo {

		interface Quote {
			ask: number
			askSize: number
			averageDailyVolume10Day: number
			averageDailyVolume3Month: number
			bid: number
			bidSize: number
			currency: string
			esgPopulated: boolean
			exchange: string
			exchangeDataDelayedBy: number
			exchangeTimezoneName: string
			exchangeTimezoneShortName: string
			fiftyDayAverage: number
			fiftyDayAverageChange: number
			fiftyDayAverageChangePercent: number
			fiftyTwoWeekHigh: number
			fiftyTwoWeekHighChange: number
			fiftyTwoWeekHighChangePercent: number
			fiftyTwoWeekLow: number
			fiftyTwoWeekLowChange: number
			fiftyTwoWeekLowChangePercent: number
			fullExchangeName: string
			gmtOffSetMilliseconds: number
			language: string
			market: string
			marketState: string
			messageBoardId: string
			priceHint: number
			quoteType: string
			regularMarketChange: number
			regularMarketChangePercent: number
			regularMarketDayHigh: number
			regularMarketDayLow: number
			regularMarketOpen: number
			regularMarketPreviousClose: number
			regularMarketPrice: number
			regularMarketTime: number
			regularMarketVolume: number
			shortName: string
			sourceInterval: number
			symbol: string
			tradeable: boolean
			twoHundredDayAverage: number
			twoHundredDayAverageChange: number
			twoHundredDayAverageChangePercent: number
		}

		interface StreamQuote {
			symbol: string
			stamp: number
			ask: number
			asksize: number
			bid: number
			bidsize: number
			pricerealtime: number
			pricerealtimeafterhours: number
			change: number
			changerealtime: number
			changerealtimeafterhours: number
			disputedchangerealtimeafterhours: number
			percentchange: number
			percentchangerealtime: number
			percentchangerealtimeafterhours: number
			daylow: number
			dayhigh: number
			volume: number
			marketcap: number
			lastsaleprice: number
			lastsaletime: number
			disputedtimestampforstocks: number
			disputedtimestampforcommodities: number
		}

	}
}
















