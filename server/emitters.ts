// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'

import cron from 'cron'
import ci from 'correcting-interval'
import ee3 from 'eventemitter3'
import uws from 'uws'
import UWebSocket from './adapters/uwebsocket'



/*█████████████████████████████████
█            EE3 TICKS            █
█████████████████████████████████*/

let ee3ts = {} as { [topic: string]: NodeJS.Timer }
let ee3is = {} as { [topic: string]: number }
function ee3start(topic: string, tick: number) {
	ee3ts[topic].unref(); clearTimeout(ee3ts[topic]); ee3ts[topic] = null; _.unset(ee3ts, topic);
	ee3is[topic] = 0
	process.ee3.emit(topic, ee3is[topic])
	ci.setCorrectingInterval(function() {
		ee3is[topic]++
		process.ee3.emit(topic, ee3is[topic])
	}, tick * 1000)
}
Object.keys(shared.enums.EE3).forEach(function(key) {
	let topic = shared.enums.EE3[key]
	let tick = Number.parseInt(key.split('_').pop())
	if (key == 'TICK_01') tick = 0.1;
	if (key == 'TICK_025') tick = 0.25;
	if (key == 'TICK_05') tick = 0.5;
	let now = Date.now()
	let second = moment(now).endOf('second').second()
	let addsec = tick - ((second + 1) % tick)
	let next = moment(now).endOf('second').add(addsec, 'seconds').valueOf() - now + 1  // + 1 for execution latency
	let start = next + utils.instanceSecs(tick)
	ee3ts[topic] = _.delay(ee3start, start, topic, tick) as any
})



/*█████████████████████████████████████
█            RADIO EMITTER            █
█████████████████████████████████████*/

declare global {
	namespace NodeJS { interface Process { radio: RadioEmitter } }
	interface RadioMessage<T = any> { action?: string, event?: string, data?: T }
}

const radioOpts = {
	path: 'radio',
	port: process.$port - 1,
}

if (utils.isMaster()) {

	const wss = new uws.Server(Object.assign({
		clientTracking: true,
		verifyClient(client, next) {
			let host = client.req.headers['host']
			next(host == 'localhost')
		},
	} as uws.IServerOptions, radioOpts))

	const cleanup = _.once(() => wss.close())
	process.on('beforeExit', cleanup)
	process.on('exit', cleanup)

	wss.on('connection', function(client) {
		client.on('message', function(message: string) {
			wss.clients.forEach(function(v) { v.send(message) })
		})
	})

	wss.on('error', function(error) {
		console.error('uws.Server > error', errors.render(error as any))
	})

}

class RadioEmitter {

	private ee3 = new ee3.EventEmitter()
	private wsc = new UWebSocket('ws://localhost:' + radioOpts.port + '/' + radioOpts.path)

	constructor() {
		this.wsc.addListener('message', function(data: RadioMessage) {

		})
	}

}
process.radio = new RadioEmitter()



// class RadioEmitter {

// 	private ws = new uws('ws://localhost:' + radioOpts.port + '/' + radioOpts.path)
// 	private ee3 = new ee3.EventEmitter()

// 	constructor() {
// 		this.ws.on('message', (message: RadioMessage) => {
// 			message = JSON.parse(message as any)
// 			console.log('message >')
// 			eyes.inspect(message)
// 			// this.ee3.emit(message.event, message.data)
// 		})
// 		// process.ee3.addListener(shared.enums.EE3.TICK_5, () => this.ws.send('ping'))
// 	}

// 	emit(event: string, data?: any) {
// 		this.ws.send(JSON.stringify({ event, data } as RadioMessage))
// 	}

// 	once(event: string, fn: (data?: any) => void) {
// 		this.ee3.once(event, fn)
// 	}

// 	addListener(event: string, fn: (data?: any) => void) {
// 		this.ee3.addListener(event, fn)
// 	}

// 	removeListener(event: string, fn?: (data?: any) => void) {
// 		this.ee3.removeListener(event, fn)
// 	}

// 	removeAllListeners(event?: string) {
// 		this.ee3.removeAllListeners(event)
// 	}

// }



/*███████████████████████████████
█            RESTART            █
███████████████████████████████*/

if (utils.isMaster()) {
	const restart = _.once(function() {
		console.warn('restart')
		// if (process.DEVELOPMENT) return;
		process.nextTick(() => process.exit(0))
	})
	process.ee3.once(shared.enums.RESTART, restart)
	process.radio.once(shared.enums.RESTART, restart)
}





