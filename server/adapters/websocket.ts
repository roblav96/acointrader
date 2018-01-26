//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import ee3 from 'eventemitter3'
import uws from 'uws'



export default class WebSocket extends ee3.EventEmitter {

	socket: uws

	connecting() { return !!this.socket && this.socket.readyState == this.socket.CONNECTING }
	ready() { return !!this.socket && this.socket.readyState == this.socket.OPEN }

	constructor(public address: string) {
		super()
		this.connect()
		process.ee3.addListener(shared.enums.EE3.TICK_5, () => this.ping())
	}

	purge(reconnect = false) {
		this.socket.close()
		this.socket.terminate()
		this.socket.removeAllListeners()
		this.socket = null
		if (reconnect) this.reconnect();
		else this.removeAllListeners();
	}

	reconnect = _.throttle(this.connect, 1000, { leading: false, trailing: true })
	connect() {
		if (this.connecting() || this.ready()) return;
		this.socket = new uws(this.address)
		this.socket.on('open', () => this.onopen())
		this.socket.on('close', (code, message) => this.onclose(code, message))
		this.socket.on('error', error => this.onerror(error))
		this.socket.on('ping', data => this.onping(data))
		this.socket.on('pong', data => this.onpong(data))
		this.socket.on('message', data => this.onmessage(data))
	}

	onopen() {
		console.info('websocket onopen >', this.address)
	}

	onclose(code: number, message: string) {
		console.warn('websocket onclose >', code, message)
		this.purge(true)
	}

	onerror(error) {
		console.error('websocket onerror > error', errors.render(error))
		this.purge(true)
	}

	ping() {
		if (!this.ready()) return;
		this.socket.ping()
	}
	onping(data) {
		console.log('onping', data)
	}
	onpong(data) {
		console.log('onpong', data)
	}

	onmessage(data) {
		this.emit('message', JSON.parse(data))
	}

}











