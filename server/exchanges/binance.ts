//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import * as errors from '../services/errors'
import * as shared from '../../shared/shared'
import * as utils from '../services/utils'

import ee3 from 'eventemitter3'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import WebSocket from '../adapters/websocket'



declare global {
	interface BinanceSocketDepth {
		event: string
	}
}

export class WS extends WebSocket {

	static ee3 = new ee3.EventEmitter()

	static parsers = {
		['depth'](data) {
			return {
				event: data.e,
				stamp: data.E,
				symbol: data.s,
				firstId: data.U,
				lastId: data.u,
				bidDepth: data.b.map(b => _.zipObject(['price', 'size'], b)),
				askDepth: data.a.map(a => _.zipObject(['price', 'size'], a)),
			}
		}
	}

	constructor(
		public type: string,
		address: string,
	) {
		super(address)
		this.addListener('message', data => {
			WS.ee3.emit('message', WS.parsers[this.type](data))
		})
	}



}



export function start() {

	// WS.ee3.addListener('message', function(data) {
	// 	console.log('data >')
	// 	eyes.inspect(data)
	// })

	// let socket = new WS('depth', 'wss://stream.binance.com:9443/ws/iostbtc@depth')
	let socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')
	// let socket = new WebSocket('wss://stream.binance.com:9443/ws/iostbtc@aggTrade')
	socket.addListener('message', data => {
		console.log('data >')
		// eyes.inspect(data)
	})

}










