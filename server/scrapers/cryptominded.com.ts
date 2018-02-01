//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'



const KEY = '283e73af65fe47b35a67b0a7368adef4ddc036181ec783268cd69a38a5036d2d'



export function syncExchanges() {
	return Promise.resolve().then(function() {
		return http.get('https://search.cryptominded.com/api/v1/search', {
			key: KEY,
			limit: 9999,
		})

	}).then(function(response) {
		let results = response.results as Array<any>
		let items = results.map(function(result) {
			return {
				id: shared.string.parseExchangeId(result.url.homepage),
				logoWide: result.url.logo,
				mobileapp: !!result.properties.mobile_app,
				fees: result.rating.fees,
				usability: result.rating.ease_of_use,
			} as Items.Exchange
		})
		items.forEach(shared.object.compact)
		return r.table('exchanges').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.warn('exchanges.sync > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('exchanges.sync > error', errors.render(error))
		return Promise.resolve(false)
	})
}

















