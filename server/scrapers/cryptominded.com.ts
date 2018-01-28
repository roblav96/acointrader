//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import url from 'url'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'



const KEY = '283e73af65fe47b35a67b0a7368adef4ddc036181ec783268cd69a38a5036d2d'



export const exchanges = {

	sync(): Promise<boolean> {
		return http.get('https://search.cryptominded.com/api/v1/search', {
			key: KEY,
			limit: 9999,
		}).then(function(response) {
			return r.table('exchanges').insert(response.results.map(function(result) {
				return {
					hostname: url.parse(result.url.homepage).hostname.split('.').splice(-2).join('.'),
					name: result.name,
					logoWideHD: result.url.logo,
				} as ExchangeItem
			}), { conflict: 'update' }).run()

		}).then(function(response) {
			return Promise.resolve(true)
		}).catch(function(error) {
			console.error('error', errors.render(error))
			return Promise.resolve(false)
		})
	},

}


if (utils.isMaster()) {

}
















