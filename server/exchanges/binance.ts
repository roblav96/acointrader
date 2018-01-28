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



export const ID = 'binance'



class Socket extends UWebSocket {

	static emitter = new ee3.EventEmitter()

	static parsers = {

		depth(data) {
			return {
				event: data.e,
				stamp: data.E,
				symbol: data.s,
				firstId: data.U,
				lastId: data.u,
				bidDepth: data.b.map(b => _.zipObject(['price', 'size'], b)),
				askDepth: data.a.map(a => _.zipObject(['price', 'size'], a)),
			}
		},

	}

	constructor(
		public address: string,
		public type: string,
	) {
		super(address)
		this.emitter.addListener('message', data => {
			// WS.emitter.emit('message', WS.parsers[this.type](data))
		})
	}



}



export function start() {
	console.warn('binance > start')

	// WS.ee3.addListener('message', function(data) {
	// 	console.log('data >')
	// 	eyes.inspect(data)
	// })

	// let socket = new WS('depth', 'wss://stream.binance.com:9443/ws/iostbtc@depth')
	// let socket = new UWebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')
	// let socket = new UWebSocket('wss://stream.binance.com:9443/ws/iostbtc@aggTrade')
	// socket.emitter.addListener('message', data => {
	// 	console.log('data >')
	// 	// eyes.inspect(data)
	// })

}

// if (utils.isMaster()) {
// 	let socket = new UWebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')
// 	socket.emitter.addListener('message', function(data) {

// 	})
// }



export function syncInfo() {
	return Promise.resolve().then(function() {
		return http.get('https://api.binance.com/api/v1/exchangeInfo')

	}).then(function(response: Binance.ExchangeInfoResponse) {

		let coins = [] as Array<Items.Asset>
		response.symbols.forEach(function(symbol) {
			let exists = coins.find(v => v.id == symbol.baseAsset)
			if (exists) return exists[ID].push(symbol.quoteAsset);
			coins.push({
				id: symbol.baseAsset,
				[ID]: [symbol.quoteAsset],
			} as Items.Asset)
		})

		return Promise.all([
			r.table('coins').insert(coins, { conflict: 'update' }).run(),
		])

	}).then(function() {
		console.warn('syncInfo > DONE')
		return Promise.resolve(true)
	}).catch(function(error) {
		console.error('syncInfo > error', errors.render(error))
		return Promise.resolve(false)
	})
}









