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



declare global {
	namespace LocalBitcoins {

	}
}



export function syncAssets() {
	// r.db('acointrader').table('assets').filter(r.row('fiat').eq(true).and(r.row('coin').eq(true)))
	return Promise.resolve().then(function() {
		return Promise.all([
			r.table('assets')('id' as any) as any,
			http.get('https://localbitcoins.com/api/currencies/'),
		])

	}).then(function(resolved) {
		let existing = resolved[0] as Array<string>
		let response = resolved[1]
		let results = response.data.currencies

		let items = [] as Array<Items.Asset>
		Object.keys(results).forEach(function(id) {
			let value = results[id]
			if (value.altcoin) return;
			let name = value.name as string
			if (name == id) return;
			name = name.substring(0, name.indexOf('(') - 1)
			let item = { id, name, fiat: true } as Items.Asset
			if (id == 'RUB') {
				let cloned = shared.object.clone(item)
				cloned.id = 'RUR'
				items.push(cloned)
			}
			if (id == 'CNY') {
				let cloned = shared.object.clone(item)
				cloned.id = 'CNH'
				cloned.name += ' Offshore'
				items.push(cloned)
			}
			if (id == 'ILS') {
				let cloned = shared.object.clone(item)
				cloned.id = 'NIS'
				items.push(cloned)
			}
			if (id == 'VEF') {
				let cloned = shared.object.clone(item)
				cloned.id = 'BSF'
				items.push(cloned)
			}
			if (existing.indexOf(id) >= 0) return;
			items.push(item)
		})
		items.forEach(shared.object.compact)
		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.warn('syncAssets > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}












