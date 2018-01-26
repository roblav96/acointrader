//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import ee3 from 'eventemitter3'
import uws from 'uws'



export default interface UWebSocket {
	addListener(event: 'connecting', cb: () => void): this
	addListener(event: 'connected', cb: () => void): this
	addListener(event: 'disconnected', cb: (code: number, message: string) => void): this
	addListener(event: 'purged', cb: () => void): this
	addListener(event: 'error', cb: (error: any) => void): this
	addListener<T = any>(event: 'message', cb: (data: T) => void): this
}

export default class UWebSocket extends ee3.EventEmitter {

	verbose = true
	warnings = true
	errors = true
	autopilot = true

	socket: uws

	connecting() { return !!this.socket && this.socket.readyState == this.socket.CONNECTING }
	ready() { return !!this.socket && this.socket.readyState == this.socket.OPEN }

	constructor(
		public address: string,
	) {
		super()
		this.connect()
		process.ee3.addListener(shared.enums.EE3.TICK_10, () => this.ping())
	}

	purge(destroy = true) {
		this.socket.close()
		this.socket.terminate()
		this.socket.removeAllListeners()
		this.socket = null
		this.emit('purged')
		if (destroy) this.removeAllListeners();
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
		this.emit('connecting')
		// this.socket.on('ping', data => this.onping(data))
		// this.socket.on('pong', data => this.onpong(data))
	}

	// private onping(data) {
	// 	if (this.verbose) console.log(this.address, '> onping data >', data);
	// }
	// private onpong(data) {
	// 	if (this.verbose) console.log(this.address, '> onpong data >', data);
	// }

	private onopen() {
		if (this.verbose) console.info(this.address, '> onopen');
		this.emit('connected')
	}

	private onclose(code: number, message: string) {
		if (this.warnings) console.warn(this.address, '> onclose >', code, message);
		this.emit('disconnected', code, message)
		this.purge(false)
	}

	private onerror(error) {
		if (this.errors) console.error(this.address, '> onerror >', errors.render(error));
		this.emit('error', error)
		this.purge(false)
	}

	private ping() {
		if (this.ready()) this.socket.ping('ping');
	}

	private onmessage(message) {
		this.emit('message', shared.json.safeParse(message))
	}

}











