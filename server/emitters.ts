// 

import os from 'os'
import cluster from 'cluster'
import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import cron from 'cron'
import ci from 'correcting-interval'
import ee3 from 'eventemitter3'
import uws from 'uws'
import * as utils from './services/utils'
import * as shared from '../shared/shared'



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
Object.keys(shared.EE3).forEach(function(key) {
	let topic = shared.EE3[key]
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
█            CLUSTER RADIO            █
█████████████████████████████████████*/

declare global {
	namespace NodeJS {
		interface Process {
			radio: PublicEmitter
		}
	}
}

const pubport = process.$port - 1

if (utils.isMaster()) {

	const wss = new uws.Server({
		path: 'master',
		port: pubport,
		clientTracking: false,
	})

	wss.on('connection', function(socket: Socket) {
		socket.on('message', function(message: string) {
			if (message == 'ping') return socket.send('pong');
			if (message.indexOf(shared.ENUMS.BROADCAST + '|') == 0) {
				process.ee3.emit(shared.ENUMS.BROADCAST, message.substring(shared.ENUMS.BROADCAST.length + 1))
				return
			}
			wss.clients.forEach(function(socket: Socket) { socket.send(message) })
		})
	})

	let i: number, len = os.cpus().length
	for (i = 0; i < len; i++) { cluster.fork() }
	cluster.on('disconnect', function(worker) {
		console.warn('cluster disconnect >', worker.id)
		process.radio.emit(shared.ENUMS.RESTART)
	})
	cluster.on('exit', function(worker, code, signal) {
		console.error('cluster exit >', worker.id, code, signal)
		process.radio.emit(shared.ENUMS.RESTART)
	})

}

class PublicEmitter {

	private ws = new uws('ws://localhost:' + pubport + '/master')
	private ee3 = new ee3.EventEmitter()

	constructor() {
		this.ws.on('message', (message: SocketMessage) => {
			if (message == 'pong') return;
			message = JSON.parse(message as any)
			this.ee3.emit(message.event, message.data)
		})
		process.ee3.addListener(shared.EE3.TICK_5, () => this.ws.send('ping'))
	}

	broadcast(message: SocketMessage) {
		this.ws.send(shared.ENUMS.BROADCAST + '|' + message.event + '|' + JSON.stringify(message))
	}

	emit(event: string, data?: any) {
		this.ws.send(JSON.stringify({ event, data } as SocketMessage))
	}

	once(event: string, fn: (data?: any) => void) {
		this.ee3.once(event, fn)
	}

	addListener(event: string, fn: (data?: any) => void) {
		this.ee3.addListener(event, fn)
	}

	removeListener(event: string, fn?: (data?: any) => void) {
		this.ee3.removeListener(event, fn)
	}

	removeAllListeners(event?: string) {
		this.ee3.removeAllListeners(event)
	}

}
process.radio = new PublicEmitter()



/*███████████████████████████████
█            RESTART            █
███████████████████████████████*/

if (utils.isMaster()) {
	const restart = _.once(function() {
		// if (process.DEVELOPMENT) return;
		console.warn('restart')
		process.nextTick(() => process.exit(0))
	})
	process.ee3.once(shared.ENUMS.RESTART, restart)
	process.radio.once(shared.ENUMS.RESTART, restart)
}





