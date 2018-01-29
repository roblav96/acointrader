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



export const IDS = [] as Array<string>
export const PAIRS = [] as Array<string>
export const SYMBOLS = [] as Array<string>
export const CURRENCIES = ['USD', 'XAU', 'XAG', 'DKK', 'JPY', 'PLN', 'AUD', 'EUR', 'KRW', 'RUB', 'BRL', 'GBP', 'MXN', 'SEK', 'CAD', 'HKD', 'MYR', 'SGD', 'CHF', 'HUF', 'NOK', 'THB', 'CLP', 'IDR', 'NZD', 'TRY', 'CNY', 'ILS', 'PHP', 'TWD', 'CZK', 'INR', 'PKR', 'ZAR']



export function initAssets() {
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

		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('initAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}




