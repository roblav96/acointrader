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
	interface RadioMessage { event?: string, data?: any, action?: string }
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

	private _ee3 = new ee3.EventEmitter()
	private _wsc = new UWebSocket('ws://localhost:' + radioOpts.port + '/' + radioOpts.path)

	private _ready = null as boolean
	isReady() { return this._ready }

	constructor() {
		this._wsc.verbose = false
		this._wsc.emitter.once('connected', () => this._ready = true)
		this._wsc.emitter.addListener('message', (message: RadioMessage) => {
			this._ee3.emit(message.event, message.data)
		})
	}

	emit(event: string, data?: any) { this._wsc.send({ event, data } as RadioMessage) }
	once(event: string, fn: (data?: any) => void) { this._ee3.once(event, fn) }
	addListener(event: string, fn: (data?: any) => void) { this._ee3.addListener(event, fn) }
	removeListener(event: string, fn?: (data?: any) => void) { this._ee3.removeListener(event, fn) }
	removeAllListeners(event?: string) { this._ee3.removeAllListeners(event) }

}
process.radio = new RadioEmitter()



const allradios = {} as Dict<boolean>
function onradio(radio: Dict<boolean>) {
	shared.object.merge(allradios, radio)
	if (Object.keys(allradios).length < process.$instances) return;
	process.radio.removeListener('radio.ready')
	process.ee3.removeListener(shared.enums.EE3.TICK_01, loopready)
	utils.ready.emitters.next(true)
}
process.radio.addListener('radio.ready', onradio)

function loopready() { process.radio.emit('radio.ready', { [process.$instance]: process.radio.isReady() }) }
process.ee3.addListener(shared.enums.EE3.TICK_01, loopready)



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





