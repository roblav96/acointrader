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
	interface UwsClient extends uws {
		events: Array<string>
	}
}

export default interface UWebSocket {
	addListener(event: 'connecting', fn: () => void): this
	addListener(event: 'connected', fn: () => void): this
	addListener(event: 'disconnected', fn: (code: number, message: string) => void): this
	addListener(event: 'purged', fn: () => void): this
	addListener(event: 'error', fn: (error: any) => void): this
	addListener<T = any>(event: 'message', fn: (data: T) => void): this
	addListener<T = any>(event: string, fn: (...args: Array<T>) => void): this
}

export default class UWebSocket {

	// static CONNECTING = 'connecting'
	// static CONNECTED = 'connected'
	// static DISCONNECTED = 'disconnected'
	// static PURGED = 'purged'
	// static ERROR = 'error'
	// static MESSAGE = 'message'

	ee3 = new ee3.EventEmitter()
	verbose = true
	warnings = true
	errors = true
	autopilot = true

	private socket: uws
	connecting() { return !!this.socket && this.socket.readyState == this.socket.CONNECTING }
	ready() { return !!this.socket && this.socket.readyState == this.socket.OPEN }

	constructor(
		public address: string,
	) {
		this.connect()
		process.ee3.addListener(shared.enums.EE3.TICK_10, () => this.ping())
	}

	private ping() { if (this.ready()) this.socket.ping('ping'); }

	// addListener(event: string, fn: (...args: Array<any>) => void) {
	// 	this.ee3.addListener(event, fn)
	// }

	purge(destroy = true) {
		this.socket.close()
		this.socket.terminate()
		this.socket.removeAllListeners()
		this.socket = null
		this.ee3.emit('purged')
		if (destroy) this.ee3.removeAllListeners();
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
		this.ee3.emit('connecting')
	}

	private onopen() {
		if (this.verbose) console.info(this.address, '> onopen');
		this.ee3.emit('connected')
	}

	private onclose(code: number, message: string) {
		if (this.warnings) console.warn(this.address, '> onclose >', code, message);
		this.ee3.emit('disconnected', code, message)
		this.purge(false)
	}

	private onerror(error) {
		if (this.errors) console.error(this.address, '> onerror >', errors.render(error));
		this.ee3.emit('error', error)
		this.purge(false)
	}

	private onmessage(message) {
		this.ee3.emit('message', shared.json.safeParse(message))
	}

	// private emit<T = any>(event: string, ...args: Array<T>) { this.ee3.emit(event, ...args) }
	// removeAllListeners(event?: string) { this.ee3.removeAllListeners(event) }
	// removeListener(event: string, fn?: (data?: any) => void) { this.ee3.removeListener(event, fn) }
	// removeAllListeners() { this.ee3.removeAllListeners() }
	// addListener(event: string, fn: (...args: Array<any>) => void) { this.ee3.addListener(event, fn) }

}











