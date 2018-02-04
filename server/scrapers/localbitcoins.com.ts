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



interface TradesResponse {
	avg_12h: string
	avg_1h: string
	avg_24h: string
	avg_6h: string
	rates: {
		last: string
	}
	volume_btc: string
}



export function syncFiats(skips: string[]) {
	// r.db('acointrader').table('assets').filter(r.row('fiat').eq(true).and(r.row('coin').eq(true)))
	return Promise.resolve().then(function() {
		return Promise.all([
			http.get('https://localbitcoins.com/api/currencies/', null, { retry: true }),
			http.get('https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/', null, { retry: true }),
		])

	}).then(function(resolved) {
		let results = resolved[0].data.currencies
		let volumes = resolved[1]

		let items = [] as Array<Items.Asset>
		Object.keys(results).forEach(function(symbol) {
			let value = results[symbol]
			if (value.altcoin) return;

			let name = value.name as string
			if (name == symbol) return;
			name = name.substring(0, name.indexOf('(') - 1)

			let item = {
				symbol, name, fiat: true,
				logo: 'https://www.coinhills.com/images/market/currency/' + symbol.toLowerCase() + '.svg',
			} as Items.Asset

			if (symbol == 'CNY') {
				let cloned = shared.object.clone(item)
				cloned.symbol = 'CNH'
				cloned.name += ' Offshore'
				cloned.logo = 'https://www.coinhills.com/images/market/currency/cnh.svg'
				items.push(cloned)
			}

			items.push(item)
		})

		items = items.filter(v => !!v && shared.string.isValidSymbol(v.symbol) && skips.indexOf(v.symbol) == -1)
		items.forEach(shared.object.compact)
		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncFiats > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncFiats > error', errors.render(error))
		return Promise.resolve(false)
	})
}








