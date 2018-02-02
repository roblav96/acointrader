//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as shared from '../../shared/shared'
import * as utils from '../services/utils'

import Exchange from './exchange'
import ee3 from 'eventemitter3'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import UWebSocket from '../adapters/uwebsocket'
import * as http from '../services/http'



export default class Binance extends Exchange {

	readonly id = 'binance'

	constructor() {
		super()
	}

	syncAssets() {
		if (process.DEVELOPMENT) return Promise.resolve(true);
		return Promise.resolve().then(() => {
			return http.get('https://api.binance.com/api/v1/exchangeInfo')

		}).then((response: Binance.ExchangeInfoResponse) => {

			let items = [] as Array<Items.Asset>
			response.symbols.forEach(symbol => {
				let exists = items.find(v => v.symbol == symbol.baseAsset)
				if (exists) return exists[this.id].push(symbol.quoteAsset);
				items.push({
					symbol: symbol.baseAsset,
					[this.id]: [symbol.quoteAsset],
				} as Items.Asset)
			})

			let coms = [
				['set', 'binance:exchangeInfo', JSON.stringify(response.symbols)],
				['set', 'binance:pairs', JSON.stringify(response.symbols.map(v => v.symbol))],
			]

			return Promise.all([
				redis.pipelinecoms(coms),
				r.table('assets').insert(items, { conflict: 'update' }).run(),
			])

		}).then(() => {
			console.warn('syncInfo > DONE')
			return Promise.resolve(true)
		}).catch(error => {
			console.error('syncInfo > error', errors.render(error))
			return Promise.resolve(false)
		})
	}

	start() {
		return Promise.resolve().then(function() {
			return redis.get('binance:pairs')

		}).then(function(pairs: Array<string>) {
			pairs = shared.json.parse(pairs)
			pairs = shared.array.chunks(pairs, process.$instances)[process.$instance]

			// if (utils.isPrimary()) {
			// 	let aggTrade = pairs.map(v => v.toLowerCase() + '@aggTrade').join('/')
			// 	let socket = new UWebSocket('wss://stream.binance.com:9443/stream?streams=' + aggTrade)
			// 	socket.verbose = false
			// 	socket.emitter.addListener('message', function(message) {
			// 		message = parsers.socket[message.data.e](message.data)
			// 		console.log('message >')
			// 		eyes.inspect(message)
			// 	})
			// }


		})
		// let socket = new UWebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')

		// socket.emitter.addListener('message', function(data) {
		// 	console.log('data >')
		// 	eyes.inspect(data)
		// })


	}

}



const parsers = {
	socket: {

		['aggTrade'](data) {
			return {
				exchange: 'binance',
				pair: data.s,
				id: data.a,
				price: Number.parseFloat(data.p),
				size: Number.parseFloat(data.q),
				firstId: data.f,
				lastId: data.l,
				executed: data.T,
				side: data.m ? 'SELL' : 'BUY',
			} as Items.MarketTrade
		},

		depth(data) {
			return {
				event: data.e,
				stamp: data.E,
				pair: data.s,
				firstId: data.U,
				lastId: data.u,
				bidDepth: data.b.map(b => _.zipObject(['price', 'size'], b)),
				askDepth: data.a.map(a => _.zipObject(['price', 'size'], a)),
			}
		}

	}
}



// class Socket extends UWebSocket {

// 	static baseURL = 'wss://stream.binance.com:9443/ws'
// 	static emitter = new ee3.EventEmitter()

// 	static parsers = {

// 		depth(data) {
// 			return {
// 				event: data.e,
// 				stamp: data.E,
// 				symbol: data.s,
// 				firstId: data.U,
// 				lastId: data.u,
// 				bidDepth: data.b.map(b => _.zipObject(['price', 'size'], b)),
// 				askDepth: data.a.map(a => _.zipObject(['price', 'size'], a)),
// 			}
// 		},

// 	}

// 	constructor(
// 		public address: string,
// 		public type: string,
// 	) {
// 		super(address)
// 		this.emitter.addListener('message', data => {
// 			// WS.emitter.emit('message', WS.parsers[this.type](data))
// 		})
// 	}



// }



// export function start() {
// 	console.warn('binance > start')

// 	// WS.ee3.addListener('message', function(data) {
// 	// 	console.log('data >')
// 	// 	eyes.inspect(data)
// 	// })

// 	// let socket = new WS('depth', 'wss://stream.binance.com:9443/ws/iostbtc@depth')
// 	// let socket = new UWebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')
// 	// let socket = new UWebSocket('wss://stream.binance.com:9443/ws/iostbtc@aggTrade')
// 	// socket.emitter.addListener('message', data => {
// 	// 	console.log('data >')
// 	// 	// eyes.inspect(data)
// 	// })

// }

// // if (utils.isMaster()) {
// // 	let socket = new UWebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')
// // 	socket.emitter.addListener('message', function(data) {

// // 	})
// // }





declare global {
	namespace Binance {

		interface ExchangeInfoResponse {
			exchangeFilters: any[]
			rateLimits: {
				interval: string
				limit: number
				rateLimitType: string
			}[]
			serverTime: number
			symbols: {
				baseAsset: string
				baseAssetPrecision: number
				filters: {
					filterType: string
					maxPrice: string
					minPrice: string
					tickSize: string
				}[]
				icebergAllowed: boolean
				orderTypes: string[]
				quoteAsset: string
				quotePrecision: number
				status: string
				symbol: string
			}[]
			timezone: string
		}

		// interface Instrument {
		// 	baseAsset: string
		// 	baseAssetPrecision: number
		// 	filters: Array<{
		// 		filterType: string
		// 		maxPrice: string
		// 		minPrice: string
		// 		tickSize: string
		// 	}>
		// 	icebergAllowed: boolean
		// 	orderTypes: Array<string>
		// 	quoteAsset: string
		// 	quotePrecision: number
		// 	status: string
		// 	symbol: string
		// }

		interface SocketDepth {

		}

	}

}









