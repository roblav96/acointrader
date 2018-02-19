//

import * as eyes from 'eyes'
import * as clc from 'cli-color'
import * as _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import * as ee3 from 'eventemitter3'
import * as WebSocket from 'uws'



// declare global {
// 	// interface UwsClient extends uws {
// 	// 	events: Array<string>
// 	// }
// 	interface UwsEmitter extends ee3 {
// 		emit(event: keyof typeof UWebSocket, ...args: Array<any>): boolean
// 		once(event: keyof typeof UWebSocket, fn: (...args: Array<any>) => void): this
// 		addListener(event: keyof typeof UWebSocket, fn: (...args: Array<any>) => void): this
// 		removeListener(event: keyof typeof UWebSocket, fn?: (data?: any) => void): this
// 		removeAllListeners(event?: keyof typeof UWebSocket): this
// 	}
// }

export default class UWebSocket {

	private static opts = {
		immortal: true,
		autoconnect: true,
	}
	
	logs = { verbose: true, warnings: true, errors: true }

	constructor(
		public address: string,
		public opts = {} as typeof UWebSocket.opts,
	) {
		shared.object.repair(this.opts, UWebSocket.opts)
		console.log('this.opts >')
		eyes.inspect(this.opts)
		// this.connect()
		// process.EE3.addListener(shared.EE3.TICK_10, () => this._socket.ping())
	}

	destroy() {
		console.warn('destroy')
		if (this._socket) {
			this._socket.close()
			this._socket.terminate()
			this._socket.removeAllListeners()
			this._socket = null
		}
	}

	private _socket: WebSocket
	connect() {
		if (this._socket) this.destroy();
		this._socket = new WebSocket(this.address)
		this._socket.on('open', this.onopen)
		this._socket.on('close', this.onclose)
		this._socket.on('error', this.onerror)
		this._socket.on('message', this.onmessage)
		// this._socket.on('ping', data => console.warn(this.address, '> ping'))
		// this._socket.on('pong', data => console.warn(this.address, '> pong'))
		// this._emitter.emit('connecting')
	}
	reconnect = _.throttle(this.connect, 1000, { leading: false, trailing: true })

	private onopen = () => {
		if (this.logs.verbose) console.info(this.address, '> connected');
		setTimeout(() => this._socket.close(1, 'dev'), 3000)
	}

	private onclose = (code: number, message: string) => {
		if (this.logs.warnings) console.warn(this.address, '> onclose >', code, message);
		// this.destroy(this.immortal)
		// this.reconnect()
		// this.destroy(this.immortal)
		// if (this.immortal) this.reconnect();
		// this._emitter.emit('disconnected', code, message)
		// this.destroy()
	}

	private onerror = error => {
		if (!error) return;
		if (this.logs.errors) console.error(this.address, '> onerror >', errors.render(error));
		// this.destroy(this.immortal)
		// this.reconnect()
		// this.destroy(this.immortal)
		// if (this.immortal) this.reconnect();
		// this.destroy(this.immortal)
		// this._emitter.emit('error', error)
		// this.destroy()
	}

	private onmessage = message => {
		// this._emitter.emit('message', shared.json.parse(message))
	}



	// send(message: any) {
	// 	this._socket.send(JSON.stringify(message), error => {
	// 		if (!error) return;
	// 		if (this.errors) console.error(this.address, '> send error >', errors.render(error as any));
	// 		this._emitter.emit('error', error)
	// 	})
	// }

	// private emit<T = any>(event: string, ...args: Array<T>) { this.ee3.emit(event, ...args) }
	// removeAllListeners(event?: string) { this.ee3.removeAllListeners(event) }
	// removeListener(event: string, fn?: (data?: any) => void) { this.ee3.removeListener(event, fn) }
	// removeAllListeners() { this.ee3.removeAllListeners() }
	// addListener(event: string, fn: (...args: Array<any>) => void) { this.ee3.addListener(event, fn) }

}











