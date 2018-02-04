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



export function syncFiats(skips: string[]): Promise<boolean> {
	// r.db('acointrader').table('assets').filter(r.row('fiat').eq(true).and(r.row('coin').eq(true)))
	return Promise.resolve().then(function() {
		return Promise.all([
			http.get('https://localbitcoins.com/api/currencies/', null, { retry: true }),
			http.get('https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/', null, { retry: true }),
		])

	}).then(function(resolved) {
		let results = resolved[0].data.currencies as Dict<LocalBitcoins.Currency>
		let tickers = resolved[1] as Dict<LocalBitcoins.Ticker>

		let items = [
			fiatAsset({ symbol: 'XAU', name: 'Gold Ounce' }),
			// fiatAsset('XAU', 'Gold Ounce'),
			// fiatAsset('XAG', 'Silver Ounce'),
			// fiatAsset('XPT', 'Platinum Ounce'),
			// fiatAsset('CNH', 'Chinese Yuan Offshore'),
		]

		Object.keys(results).forEach(function(symbol) {
			let currency = results[symbol]
			if (currency.altcoin) return;

			let name = currency.name
			let iend = name.indexOf('(')
			if (iend > 0) name = name.substring(0, iend).trim();
			if (name == symbol) return;
			if (items.findIndex(v => v.symbol == symbol) >= 0) return;

			items.push(fiatAsset({ symbol, name }))

		})

		items = items.filter(v => !!v && shared.isSymbol(v.symbol) && skips.indexOf(v.symbol) == -1)
		items.forEach(shared.object.compact)
		// return r.table('assets').insert(items, { conflict: 'update' }).run()
		console.log('items >')
		eyes.inspect(items)

	}).then(function() {
		console.info('syncFiats > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncFiats > error', errors.render(error))
		return Promise.resolve(false)
	})
}



function fiatAsset(item: Partial<Items.Asset>): Items.Asset {
	return Object.assign({
		fiat: true,
		logo: 'https://www.coinhills.com/images/market/currency/' + item.symbol.toLowerCase() + '.svg',
	} as Items.Asset, item)
	// return {
	// 	symbol, name, fiat: true,
	// 	logo: 'https://www.coinhills.com/images/market/currency/' + symbol.toLowerCase() + '.svg',
	// } as Items.Asset
}







