// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import pevent from 'p-event'
import pforever from 'p-forever'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from './http'



export const FIATS = [] as Array<string>
export const PAIRS = [] as Array<string>
export const PRIMARIES = ['USD', 'XAU', 'XAG', 'DKK', 'JPY', 'PLN', 'AUD', 'EUR', 'KRW', 'RUB', 'BRL', 'GBP', 'MXN', 'SEK', 'CAD', 'HKD', 'MYR', 'SGD', 'CHF', 'HUF', 'NOK', 'THB', 'CLP', 'IDR', 'NZD', 'TRY', 'CNY', 'ILS', 'PHP', 'TWD', 'CZK', 'INR', 'PKR', 'ZAR']
export const SYMBOLS = [] as Array<string>



export function initAssets() {
	return Promise.resolve().then(function() {
		return r.table('assets').filter(r.row('fiat').eq(true)).run()

	}).then(function(assets: Array<Items.Asset>) {
		assets.forEach(function(asset) {
			FIATS.push(asset.id)
		})

		FIATS.forEach(function(base) {
			FIATS.forEach(function(quote) {
				if (base == quote) return;
				let pair = base + quote
				PAIRS.push(pair)
			})
		})

		PRIMARIES.forEach(function(base) {
			PRIMARIES.forEach(function(quote) {
				if (base == quote) return;
				SYMBOLS.push(base + quote + '=X')
			})
		})

		utils.ready.forex.next(true)

		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('initAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}



function syncYahooQuotes(first = false) {
	return Promise.resolve().then(function() {
		if (utils.isPrimary() && first == true) return Promise.resolve();
		return pevent(process.ee3, shared.enums.EE3.TICK_60)

	}).then(function() {
		return http.get('https://query1.finance.yahoo.com/v7/finance/quote', {
			symbols: SYMBOLS.join(','),
		}, { silent: true })

	}).then(function(response) {
		let fxquotes = response.quoteResponse.result as Array<Yahoo.ForexQuote>

		let items = fxquotes.filter(v => !!v).map(function(fxquote) {
			let split = fxquote.shortName.split('/')
			return {
				pair: fxquote.symbol.split('=').shift(),
				base: split[0],
				quote: split[1],
				symbol: fxquote.symbol,
				exchange: fxquote.exchange,
				bidPrice: fxquote.bid,
				bidSize: fxquote.bidSize,
				askPrice: fxquote.ask,
				askSize: fxquote.askSize,
				price: fxquote.regularMarketPrice,
				change: fxquote.regularMarketChange,
				changePercent: fxquote.regularMarketChangePercent,
				updated: fxquote.regularMarketTime * 1000,
			} as Items.ForexQuote
		})
		items.forEach(shared.object.compact)

		// redis


	}).catch(function(error) {
		console.error('syncYahooQuotes > error', error)
		return Promise.resolve()
	})
}

utils.ready.forex.skip(1).subscribe(function() {
	if (utils.isMaster()) return;
	pforever(syncYahooQuotes, true)
})




