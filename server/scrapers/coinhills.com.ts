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
	namespace Coinhills {

	}
}



export function syncFiats() {
	// r.db('acointrader').table('assets').filter(r.row('fiat').eq(true).and(r.row('coin').eq(true)))
	return Promise.resolve().then(function() {
		return Promise.all([
			r.table('assets')('id' as any) as any,
			http.scrape('https://www.coinhills.com/market/currency/'),
		])

	}).then(function(resolved) {
		let existing = resolved[0] as Array<string>
		let $ = cheerio.load(resolved[1])
		let items = [] as Array<Items.Asset>
		$('.container a[title]').each(function(i, el) {
			let title = el.attribs['title']
			let name = title.substring(title.indexOf(' to ') + 4, title.indexOf(' markets')).trim()

			let $el = $(el)
			let style = $el.find('.symbol').attr('style')
			let url = style.substring(style.indexOf(`url( '`) + 6, style.indexOf(`' )`))
			let logo = ('https://www.coinhills.com' + url).trim()

			let symbol = url.split('/').pop()
			symbol = symbol.substring(0, symbol.indexOf('.')).trim().toUpperCase()

			let item = { symbol, name, logo, fiat: true } as Items.Asset

			if (symbol == 'CNH') {
				let clone = shared.object.clone(item)
				clone.symbol = 'CNY'
				items.push(clone)
			}
			if (symbol == 'ILS') {
				let clone = shared.object.clone(item)
				clone.symbol = 'NIS'
				items.push(clone)
			}
			if (symbol == 'BSF') {
				let clone = shared.object.clone(item)
				clone.symbol = 'VEF'
				items.push(clone)
			}

			if (existing.indexOf(symbol) >= 0) return;

			items.push(item)
		})
		console.log('items >')
		eyes.inspect(items)
		// items.forEach(shared.object.compact)
		// return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.warn('syncFiats > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncFiats > error', errors.render(error))
		return Promise.resolve(false)
	})
}












