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



export function syncFiats(skips: string[]) {
	// r.db('acointrader').table('assets').filter(r.row('fiat').eq(true).and(r.row('coin').eq(true)))
	return Promise.resolve().then(function() {
		return http.get('https://localbitcoins.com/api/currencies/', null, { retry: true })

	}).then(function(response) {
		let results = response.data.currencies

		let items = [] as Array<Items.Asset>
		Object.keys(results).forEach(function(id) {
			let value = results[id]
			if (value.altcoin) return;

			let name = value.name as string
			if (name == id) return;
			name = name.substring(0, name.indexOf('(') - 1)

			let item = {
				id, name, fiat: true,
				logo: 'https://www.coinhills.com/images/market/currency/' + id.toLowerCase() + '.svg',
			} as Items.Asset

			if (id == 'CNY') {
				let cloned = shared.object.clone(item)
				cloned.id = 'CNH'
				cloned.name += ' Offshore'
				cloned.logo = 'https://www.coinhills.com/images/market/currency/cnh.svg'
				items.push(cloned)
			}

			items.push(item)
		})

		items = items.filter(v => !!v && shared.string.isValidSymbol(v.id) && skips.indexOf(v.id) == -1)
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












