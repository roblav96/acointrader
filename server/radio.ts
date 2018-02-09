// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'

import cluster from 'cluster'
import url from 'url'
import moment from 'moment'
import ee3 from 'eventemitter3'
import ci from 'correcting-interval'
import pevent from 'p-event'
import uws from 'uws'
import UWebSocket from './adapters/uwebsocket'



/*█████████████████████████████████
█            EE3 TICKS            █
█████████████████████████████████*/

const ee3ts = {} as { [topic: string]: NodeJS.Timer }
const ee3is = {} as { [topic: string]: number }
function ee3start(topic: string, ms: number) {
	ee3ts[topic].unref(); clearTimeout(ee3ts[topic]); ee3ts[topic] = null; _.unset(ee3ts, topic);
	ee3is[topic] = 0
	process.ee3.emit(topic, ee3is[topic])
	ci.setCorrectingInterval(function() {
		ee3is[topic]++
		process.ee3.emit(topic, ee3is[topic])
	}, ms)
}
setImmediate(function() {
	Object.keys(shared.enums.EE3).forEach(function(key, i) {
		let topic = shared.enums.EE3[key]
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
	namespace NodeJS {
		interface Process { radio: RadioEmitter }
	}
	namespace Radio {
		interface Message { event?: string, data?: any, action?: string }
	}
}

const opts = {
	path: 'radio',
	port: process.$port - 1,
}

if (process.MASTER) {

	const wss = new uws.Server(Object.assign({
		verifyClient(client, next) {
			let host = client.req.headers['host']
			next(host == 'localhost')
		},
	} as uws.IServerOptions, opts))

	const ready = _.once(function() {
		setImmediate(() => process.radio.emit(utils.rxReadys.radios.event))
	})

	wss.on('connection', function(client) {
		client.on('message', function(message: string) {
			wss.clients.forEach(function(v) { v.send(message) })
		})
		if (wss.clients.length == (process.$instances + 1)) ready();
	})

	wss.on('error', function(error: any) {
		console.error('uws.Server > radio error', errors.render(error))
	})

}

class RadioEmitter {

	private _ee3 = new ee3.EventEmitter()
	private _wsc = new UWebSocket('ws://localhost:' + opts.port + '/' + opts.path)

	constructor() {
		this._wsc.verbose = false
		this._wsc.emitter.addListener('message', (message: Radio.Message) => {
			this._ee3.emit(message.event, message.data)
		})
		this.once(utils.rxReadys.radios.event, () => utils.rxReadys.radios.ready = true)
	}

	emit(event: string, data?: any) { this._wsc.send({ event, data } as Radio.Message) }
	once(event: string, fn: (data?: any) => void) { this._ee3.once(event, fn) }
	addListener(event: string, fn: (data?: any) => void) { this._ee3.addListener(event, fn) }
	removeListener(event: string, fn?: (data?: any) => void) { this._ee3.removeListener(event, fn) }
	removeAllListeners(event?: string) { this._ee3.removeAllListeners(event) }

}
process.radio = new RadioEmitter()



/*███████████████████████████████
█            WORKERS            █
███████████████████████████████*/

if (process.MASTER) {

	let host = url.parse(process.$domain).host
	if (process.DEVELOPMENT) host = process.$host + ':' + process.$port;
	console.log('\n\n' +
		clc.bold.underline.cyan('𝛂CoinTrader') + '\n' +
		'v' + process.$version + ' ' +
		clc.bold(process.ENV) + '\n' +
		host + '\n' +
		'/*===============================================\n' +
		'=========           ' + clc.bold(moment().format('hh:mm:ss')) + '           ==========\n' +
		'===============================================*/'
	)

	console.log(clc.bold('Forking x' + clc.bold.redBright(process.$instances) + ' nodes in cluster...'))
	let i: number, len = process.$instances
	for (i = 0; i < len; i++) { cluster.fork() }
	cluster.on('disconnect', function(worker) {
		console.warn('cluster disconnect >', worker.id)
		process.radio.emit('RESTART')
	})
	cluster.on('exit', function(worker, code, signal) {
		console.error('cluster exit >', worker.id, code, signal)
		process.radio.emit('RESTART')
	})

	const restart = _.once(function() {
		console.warn('RESTART')
		// if (process.DEVELOPMENT) return;
		process.nextTick(() => process.exit(0))
	})
	process.ee3.once('RESTART', restart)
	process.radio.once('RESTART', restart)

}




