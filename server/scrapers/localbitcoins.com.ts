//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import pall from 'p-all'
import cheerio from 'cheerio'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'
import * as assets from '../services/assets'



export function getFiatAssets(): Promise<Items.Asset[]> {
	return Promise.resolve().then(function() {
		return http.get('https://localbitcoins.com/api/currencies/')

	}).then(function(response) {
		let results = response.data.currencies as Dict<LocalBitcoins.Currency>

		let items = [] as Items.Asset[]
		Object.keys(results).forEach(function(symbol) {
			let currency = results[symbol]
			if (currency.altcoin) return;
			if (!shared.valid.symbol(symbol)) return;
			if (items.findIndex(v => v.symbol == symbol) >= 0) return;

			let name = currency.name
			let iend = name.indexOf('(')
			if (iend > 0) name = name.substring(0, iend).trim();
			if (name == symbol) return;

			items.push({ symbol, name, fiat: true } as Items.Asset)

		})

		return Promise.resolve(items)

	}).catch(function(error) {
		console.error('getFiatAssets > error', errors.render(error))
		return Promise.resolve([])
	})
}







declare global {
	namespace LocalBitcoins {

		interface Currency {
			name: string
			altcoin: boolean
		}
		interface Ticker {
			avg_1h: number
			avg_6h: number
			avg_12h: number
			avg_24h: number
			rates: { last: number }
			volume_btc: number
		}

	}
}











