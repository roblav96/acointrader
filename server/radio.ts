// 

import * as eyes from 'eyes'
import * as clc from 'cli-color'
import * as _ from 'lodash'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'

import * as cluster from 'cluster'
import * as url from 'url'
import * as moment from 'moment'
import * as ee3 from 'eventemitter3'
import * as ci from 'correcting-interval'
import * as pevent from 'p-event'
import * as uws from 'uws'
import UWebSocket from './adapters/uwebsocket'



/*█████████████████████████████████
█            EE3 TICKS            █
█████████████████████████████████*/

const ee3ts = {} as { [topic: string]: NodeJS.Timer }
const ee3is = {} as { [topic: string]: number }
function ee3start(topic: string, ms: number) {
	ee3ts[topic].unref(); clearTimeout(ee3ts[topic]); ee3ts[topic] = null; _.unset(ee3ts, topic);
	ee3is[topic] = 0
	process.EE3.emit(topic, ee3is[topic])
	ci.setCorrectingInterval(function() {
		ee3is[topic]++
		process.EE3.emit(topic, ee3is[topic])
	}, ms)
}
setImmediate(function() {
	Object.keys(shared.EE3).forEach(function(key, i) {
		let topic = shared.EE3[key]
		let tick = Number.parseInt(key.split('_').pop())
		if (key == 'TICK_01') tick = 0.1;
		if (key == 'TICK_025') tick = 0.25;
		if (key == 'TICK_05') tick = 0.5;
		let ms = tick * 1000
		let now = Date.now()
		let start = now - (now % ms)
		let end = start + ms
		let ims = utils.instanceMs(ms)
		let delayms = (start + ims) - now
		if (delayms <= 0) delayms = (end + ims) - now;
		ee3ts[topic] = _.delay(ee3start, delayms, topic, ms) as any
	})
})



/*█████████████████████████████████████
█            RADIO EMITTER            █
█████████████████████████████████████*/

declare global {
	namespace NodeJS { interface Process { RADIO: RadioEmitter } }
	// namespace Radio {
	// 	interface Message { event?: string, data?: any, action?: string }
	// }
}

const ropts = {
	path: 'radio',
	port: process.PORT - 1,
}

if (process.MASTER) {

	const wss = new uws.Server(Object.assign({
		verifyClient(client, next) {
			let host = client.req.headers['host']
			next(host == 'localhost')
		},
	} as uws.IServerOptions, ropts))

	const ready = _.once(function() {
		setImmediate(() => process.RADIO.emit(utils.rxReadys.radios.event))
	})

	wss.on('connection', function(client) {
		client.on('message', function(message: string) {
			wss.clients.forEach(function(v) { v.send(message) })
		})
		if (wss.clients.length == (process.INSTANCES + 1)) ready();
	})

	wss.on('error', function(error: any) {
		console.error('uws.Server > radio error', errors.render(error))
	})

}

class RadioEmitter {

	private _ee3 = new ee3()
	private _wsc = new UWebSocket('ws://localhost:' + ropts.port + '/' + ropts.path)

	constructor() {
		this._wsc.addListener('EventEmitter')
		// this._wsc.verbose = false
		// this._wsc.emitter.addListener('message', (message: Radio.Message) => {
		// 	this._ee3.emit(message.event, message.data)
		// })
		// this.once(utils.rxReadys.radios.event, () => utils.rxReadys.radios.ready = true)
	}

	emit(event: string, data?: any) { this._wsc.send({ event, data } as Radio.Message) }
	once(event: string, fn: (data?: any) => void) { this._ee3.once(event, fn) }
	addListener(event: string, fn: (data?: any) => void) { this._ee3.addListener(event, fn) }
	removeListener(event: string, fn?: (data?: any) => void) { this._ee3.removeListener(event, fn) }
	removeAllListeners(event?: string) { this._ee3.removeAllListeners(event) }

}
process.RADIO = new RadioEmitter()








