// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import pevent from 'p-event'
import pforever from 'p-forever'
import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from './http'
import * as yahoo from '../scrapers/yahoo.com'



export function start(symbols: string[]) {
	return Promise.resolve().then(function() {
		console.log('symbols.length', symbols.length)

		let pairs = [] as string[]
		symbols.forEach(function(base) {
			symbols.forEach(function(quote) {
				if (base == quote) return;
				pairs.push(base + quote)
			})
		})

		let chunk = shared.array.ichunk(pairs)
		console.log('chunk.length', chunk.length)

		

	}).catch(function(error) {
		console.error('startForex > error', errors.render(error))
	})
}







// export const IDS = [] as Array<string>
// export const PAIRS = [] as Array<string>
// export const SYMBOLS = [] as Array<string>
// export const FIATS = ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'USD', 'ZAR']

// export function initAssets(): Promise<void> {
// 	return Promise.resolve().then(function() {
// 		return r.table('assets').filter(r.row('fiat').eq(true)).run()

// 	}).then(function(assets: Array<Items.Asset>) {
// 		assets.forEach(function(asset) {
// 			IDS.push(asset.symbol)
// 		})

// 		IDS.forEach(function(base) {
// 			IDS.forEach(function(quote) {
// 				if (base == quote) return;
// 				PAIRS.push(base + quote)
// 			})
// 		})

// 		FIATS.forEach(function(base) {
// 			FIATS.forEach(function(quote) {
// 				if (base == quote) return;
// 				SYMBOLS.push(base + quote + '=X')
// 			})
// 		})

// 		// utils.rxready.forex.next(true)

// 		return Promise.resolve()

// 	}).catch(function(error) {
// 		console.error('initAssets > error', errors.render(error))
// 		return pevent(process.ee3, shared.enums.EE3.TICK_3).then(initAssets)
// 	})
// }




