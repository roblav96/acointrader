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



export const coins = {

	sync() {
		return Promise.resolve().then(function() {
			return http.get('https://api.coinmarketcap.com/v1/ticker/', {
				limit: -1,
			})

		}).then(function(response: Array<CoinMarketCap.Ticker>) {
			let items = response.map(function(ticker) {
				return {
					id: ticker.symbol,
					name: ticker.name,
					available: Number.parseFloat(ticker.available_supply),
					total: Number.parseFloat(ticker.total_supply),
					max: Number.parseFloat(ticker.max_supply),
				} as Items.Coin
			})
			items.forEach(shared.object.compact)
			return r.table('coins').insert(items, { conflict: 'update' }).run()

		}).then(function() {
			console.warn('coins.sync > DONE')
			return Promise.resolve(true)

		}).catch(function(error) {
			console.error('coins.sync > error', errors.render(error))
			return Promise.resolve(false)
		})
	},

}
















