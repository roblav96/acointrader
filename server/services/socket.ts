// 

import cluster from 'cluster'
import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import restify from 'restify'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import uws from 'uws'



// let allevents = [] as Array<string>
// function syncEvents(message) {
// 	message = JSON.parse(message)
// 	if (!Array.isArray(message)) return;
// 	allevents = message
// }
// process.ee3_public.addListener('_socket.syncEvents', syncEvents)



// export function hasSubscriber(event: string) {
// 	return allevents.indexOf(event) >= 0
// }

// export function emit<T>(event: string, data: T) {
// 	if (!hasSubscriber(event)) return;
// 	process.ee3_public.broadcast({ event, data })
// }



// if (utils.isMaster()) {

// 	const wss = new uws.Server({
// 		port: process.$port + 1,
// 		clientTracking: false,
// 	})

// 	process.ee3_private.addListener(shared.RKEY.BROADCAST, function(data: string) {
// 		let i = data.indexOf('|{"')
// 		let event = data.substring(0, i)
// 		let message = data.substring(i + 1)
// 		wss.clients.forEach(function(socket: Socket) {
// 			if (socket.events.indexOf(event) >= 0) socket.send(message);
// 		})
// 	})

// 	const syncEvents = function() {
// 		let events = [] as Array<string>
// 		wss.clients.forEach(function(socket: Socket) {
// 			events = events.concat(socket.events)
// 		})
// 		events = _.uniq(_.compact(events))
// 		process.ee3_public.emit('_socket.syncEvents', JSON.stringify(events))
// 	}

// 	wss.on('connection', function(socket: Socket) {
// 		if (!Array.isArray(socket.events)) socket.events = [];
// 		socket.on('message', function(message: SocketMessage) {
// 			message = shared.safeParse(message)
// 			if (message.action == 'ping') return socket.send('pong');
// 			if (message.action == 'sync') {
// 				socket.events = message.data
// 				syncEvents()
// 			}
// 		})
// 		socket.on('close', function(code, message) {
// 			syncEvents()
// 		})
// 	})

// 	wss.on('error', function(error) {
// 		logger.error('socket wss > error', utils.peRender(error as any))
// 	})

// 	const cleanup = _.once(function() { wss.removeAllListeners(); wss.close() })
// 	process.on('beforeExit', cleanup)
// 	process.on('exit', cleanup)

// }


