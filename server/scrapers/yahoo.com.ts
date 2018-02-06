//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import pevent from 'p-event'
import pforever from 'p-forever'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'
import * as forex from '../services/forex'



export function syncForexQuotes(first?: boolean) {
	return Promise.resolve().then(function() {
		if (first === true && process.PRIMARY) return Promise.resolve();
		return pevent(process.ee3, shared.enums.EE3.TICK_30)

	}).then(function() {
		return http.get('https://query1.finance.yahoo.com/v7/finance/quote', {
			// symbols: forex.SYMBOLS.join(','),
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

	}
}
















