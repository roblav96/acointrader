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
import * as yahoo from '../scrapers/yahoo.com'



export const IDS = [] as Array<string>
export const PAIRS = [] as Array<string>
export const SYMBOLS = [] as Array<string>
export const CURRENCIES = ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'USD', 'XAG', 'XAU', 'ZAR']



export function initAssets(): Promise<void> {
	return Promise.resolve().then(function() {
		return r.table('assets').filter(r.row('fiat').eq(true)).run()

	}).then(function(assets: Array<Items.Asset>) {
		assets.forEach(function(asset) {
			IDS.push(asset.id)
		})

		IDS.forEach(function(base) {
			IDS.forEach(function(quote) {
				if (base == quote) return;
				PAIRS.push(base + quote)
			})
		})

		CURRENCIES.forEach(function(base) {
			CURRENCIES.forEach(function(quote) {
				if (base == quote) return;
				SYMBOLS.push(base + quote + '=X')
			})
		})

		utils.ready.forex.next(true)

		return Promise.resolve()

	}).catch(function(error) {
		console.error('initAssets > error', errors.render(error))
		return pevent(process.ee3, shared.enums.EE3.TICK_1).then(initAssets)
	})
}




