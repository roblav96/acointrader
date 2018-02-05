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



export function syncFiatAssets(): Promise<boolean> {
	return Promise.resolve().then(function() {
		return Promise.all([
			http.get('https://localbitcoins.com/api/currencies/'),
			http.get('https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/'),
		])

	}).then(function(resolved) {
		let results = resolved[0].data.currencies as Dict<LocalBitcoins.Currency>
		let tickers = resolved[1] as Dict<LocalBitcoins.Ticker>

		let items = [
			{ symbol: 'XAU', name: 'Gold Ounce', commodity: true },
			{ symbol: 'XAG', name: 'Silver Ounce', commodity: true },
			{ symbol: 'XPT', name: 'Platinum Ounce', commodity: true },
			{ symbol: 'CNH', name: 'Chinese Yuan Offshore', fiat: true },
		] as Items.Asset[]

		Object.keys(results).forEach(function(symbol) {
			let currency = results[symbol]
			let name = currency.name

			if (currency.altcoin) return;
			if (name == symbol) return;
			if (!tickers[symbol]) return;
			if (items.findIndex(v => v.symbol == symbol) >= 0) return;

			let iend = name.indexOf('(')
			if (iend > 0) name = name.substring(0, iend).trim();
			items.push({ symbol, name, fiat: true } as Items.Asset)

		})

		_.remove(items, function(item, i) {
			if (!shared.valid.symbol(item.symbol)) return true;
			item.logo = 'https://www.coinhills.com/images/market/currency/' + item.symbol.toLowerCase() + '.svg'
			shared.object.compact(item)
			return false
		})

		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncFiatAssets > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncFiatAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}











