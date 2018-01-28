//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as shared from '../../shared/shared'
import * as utils from '../services/utils'

import ee3 from 'eventemitter3'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import UWebSocket from '../adapters/uwebsocket'
import * as http from '../services/http'



export const ID = 'upbit'



export function start() {
	console.warn('upbit > start')
}



export function syncAssets() {
	return Promise.resolve().then(function() {
		return http.get('https://ccx.upbit.com/api/v1/market_status/all')

	}).then(function(response: Array<Upbit.SymbolMarketStatus>) {
		
		let assets = [] as Array<Items.Asset>
		response.forEach(function(symbol) {
			let split = symbol.name.split('/')
			let base = split[0]
			let quote = split[1]
			let exists = assets.find(v => v.id == base)
			if (exists) return exists[ID].push(quote);
			assets.push({
				id: base,
				[ID]: [quote],
			} as Items.Asset)
		})

		return Promise.all([
			// r.table('coins').insert(assets, { conflict: 'update' }).run(),
		])

	}).then(function() {
		console.warn('syncInfo > DONE')
		return Promise.resolve(true)
	}).catch(function(error) {
		console.error('syncInfo > error', errors.render(error))
		return Promise.resolve(false)
	})
}









