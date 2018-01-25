//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import * as errors from '../services/errors'
import * as shared from '../../shared/shared'
import * as utils from '../services/utils'

import uws from 'uws'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import websocket from '../adapters/websocket'



export function start() {
	
	// let socket = new websocket('wss://stream.binance.com:9443/ws/ETHBTC@ticker')
	let socket = new websocket('wss://stream.binance.com:9443/ws/!ticker@arr')
	socket.ee3.addListener('message', function (data) {
		// console.log('data', data)
	})
	
}
if (utils.isMaster()) start();









