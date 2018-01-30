//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import ee3 from 'eventemitter3'
import uws from 'uws'



declare global {
	// interface UwsClient extends uws {
	// 	events: Array<string>
	// }
	interface UwsEmitter extends ee3.EventEmitter {
		emit(event: keyof typeof UWebSocket, ...args: Array<any>): boolean
		once(event: keyof typeof UWebSocket, fn: (...args: Array<any>) => void): this
		addListener(event: keyof typeof UWebSocket, fn: (...args: Array<any>) => void): this
		removeListener(event: keyof typeof UWebSocket, fn?: (data?: any) => void): this
		removeAllListeners(event?: keyof typeof UWebSocket): this
	}
}

export default class UWebSocket {

	static readonly connecting = 'connecting'
	static readonly connected = 'connected'
	static readonly disconnected = 'disconnected'
	static readonly destroyed = 'destroyed'
	static readonly error = 'error'
	static readonly message = 'message'

	emitter = new ee3.EventEmitter() as UwsEmitter

	verbose = true
	warnings = true
	errors = true
	autopilot = true

	private socket: uws
	connecting() { return !!this.socket && this.socket.readyState == this.socket.CONNECTING }
	ready() { return !!this.socket && this.socket.readyState == this.socket.OPEN }

	constructor(public address: string) {
		this.connect()
		process.ee3.addListener(shared.enums.EE3.TICK_10, () => this.socket.ping())
	}

	purge(destroy = true) {
		this.socket.close()
		this.socket.terminate()
		this.socket.removeAllListeners()
		// this.socket = null
		this.emitter.emit('destroyed')
		if (destroy) this.emitter.removeAllListeners();
		else if (this.autopilot) this.reconnect();
	}

	reconnect = _.throttle(this.connect, 1000, { leading: false, trailing: true })
	connect() {
		if (this.connecting() || this.ready()) return;
		this.socket = new uws(this.address)
		this.socket.on('open', () => this.onopen())
		this.socket.on('close', (code, message) => this.onclose(code, message))
		this.socket.on('error', error => this.onerror(error))
		this.socket.on('message', data => this.onmessage(data))
		this.emitter.emit('connecting')
		// this.socket.on('ping', data => console.warn(this.address, '> ping'))
		// this.socket.on('pong', data => console.warn(this.address, '> pong'))
	}

	private onopen() {
		if (this.verbose) console.info(this.address, '> connected');
		this.emitter.emit('connected')
	}

	private onclose(code: number, message: string) {
		if (this.warnings) console.warn(this.address, '> onclose >', code, message);
		this.emitter.emit('disconnected', code, message)
		this.purge(false)
	}

	private onerror(error) {
		if (!error) return;
		if (this.errors) console.error(this.address, '> onerror >', errors.render(error));
		this.emitter.emit('error', error)
		this.purge(false)
	}

	private onmessage(message) {
		this.emitter.emit('message', shared.json.parse(message))
	}

	send(message: any) {
		this.socket.send(JSON.stringify(message), error => {
			if (!error) return;
			if (this.errors) console.error(this.address, '> send error >', errors.render(error as any));
			this.emitter.emit('error', error)
		})
	}

	// private emit<T = any>(event: string, ...args: Array<T>) { this.ee3.emit(event, ...args) }
	// removeAllListeners(event?: string) { this.ee3.removeAllListeners(event) }
	// removeListener(event: string, fn?: (data?: any) => void) { this.ee3.removeListener(event, fn) }
	// removeAllListeners() { this.ee3.removeAllListeners() }
	// addListener(event: string, fn: (...args: Array<any>) => void) { this.ee3.addListener(event, fn) }

}











