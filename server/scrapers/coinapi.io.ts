//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import pall from 'p-all'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'



declare global {
	namespace CoinAPI {

		interface Asset {
			asset_id: string
			data_end: string
			data_orderbook_end: string
			data_orderbook_start: string
			data_quote_count: number
			data_quote_end: string
			data_quote_start: string
			data_start: string
			data_symbols_count: number
			data_trade_count: number
			data_trade_end: string
			data_trade_start: string
			name: string
			type_is_crypto: number
		}

	}
}



// export function syncAssets() {
// 	return Promise.resolve().then(function() {
// 		return http.get('https://rest.coinapi.io/v1/assets')

// 	}).then(function(response: Array<CoinAPI.Asset>) {
// 		let items = response.filter(function(asset) {
// 			return asset.type_is_crypto == 0
// 		}).map(function(asset) {
// 			return {
// 				id: asset.asset_id,
// 				name: asset.name,
// 				fiat: true,
// 			} as Items.Asset
// 		})
// 		items.forEach(shared.object.compact)
// 		return r.table('assets').insert(items, { conflict: 'update' }).run()

// 	}).then(function() {
// 		console.warn('syncAssets > DONE')
// 		return Promise.resolve(true)

// 	}).catch(function(error) {
// 		console.error('syncAssets > error', errors.render(error))
// 		return Promise.resolve(false)
// 	})
// }












