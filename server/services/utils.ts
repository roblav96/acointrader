// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'

import cluster from 'cluster'
import moment from 'moment'
import restify from 'restify'
import rx from 'rxjs/Rx'
import pevent from 'p-event'



class Ready {
	id: string
	event: string
	private _subject = new rx.BehaviorSubject(false)
	get ready() { return this._subject.value }
	set ready(ready: boolean) { if (!this._subject.value) this._subject.next(ready); }
	constructor(public opts = { auto: true }) {
		if (this.opts.auto) {
			process.nextTick(() => process.radio.once(this.event, () => this.ready = true))
		}
	}
	onReady() {
		if (this._subject.value) return Promise.resolve();
		return new Promise(resolve => {
			this._subject.filter(v => !!v).take(1).subscribe(resolve)
		}).then(() => Promise.resolve())
	}
}

class Readys {
	radios = new Ready({ auto: false })
	restify = new Ready({ auto: false })
	assets = new Ready()
	ledger = new Ready()
}

export const rxReadys = new class RxReadys extends Readys {
	constructor() {
		super()
		Object.keys(this).forEach(key => {
			let ready = this[key] as Ready
			ready.id = key
			ready.event = 'utils.ready.' + key
		})
	}
}



export function radioMaster(event: string, data?: any) {
	if (!process.MASTER) return;
	process.radio.emit(event, data)
	let all = shared.array.create(process.$instances).map(i => event + '.' + i)
	console.log('all >')
	eyes.inspect(all)
	return Promise.all(all.map(v => pevent(process.radio, v)))
}

export function radioWorkerListener(event: string, fn: (event: string) => void) {
	if (process.MASTER) return;
	process.radio.addListener(event, fn)
}

export function radioWorkerEmit(event: string, data?: any) {
	if (process.MASTER) return;
	process.radio.emit(event + '.' + process.$instance, data)
}

// onceMaster(event: string, fn: (datas?: any[]) => void) {
// 	let wevent = '_w_.' + event
// 	process.radio.once(wevent, fn)
// 	if (!process.MASTER) return;
// 	let all = shared.array.create(process.$instances).map(i => wevent + '.' + i)
// 	console.log('all >')
// 	eyes.inspect(all)
// 	Promise.all(all.map(v => pevent(process.radio, v))).then(function(datas) {
// 		process.radio.emit(wevent, datas)
// 	})
// }
// emitWorker(event: string, data?: any) {
// 	process.radio.emit('_w_.' + event + '.' + process.$instance, data)
// }

// export function radioWorkersOnce(event: string, fn: (datas?: any[]) => void) {
// 	process.radio.once('_' + event, fn)
// 	if (!process.MASTER) return;
// 	let all = Array.from(Array(process.$instances), (v, i) => '_' + event + '_' + i)
// 	Promise.all(all.map(ievent => pevent(process.radio, ievent))).then(function(resolved) {
// 		process.radio.emit('_' + event, resolved)
// 	})
// }

// export function radioWorkerEmit(event: string, data?: any) {
// 	process.radio.emit('_' + event + '_' + process.$instance, data)
// }

// allOnce(event: string, fn: (datas?: any[]) => void) {
// 	let all = Array.from(Array(process.$instances), (v, i) => event + '.' + i)
// 	console.log('all >')
// 	eyes.inspect(all)
// 	Promise.all(all.map(ievent => pevent(this._ee3, ievent))).then(function(resolved) {

// 	})
// }
// iemit(event: string, data?: any) {

// }

// private _onces = {} as Dict<{ fn: (datas?: any[]) => void, datas: any[] }>
// workersOnce(event: string, fn: (datas?: any[]) => void) {
// 	this._onces[event] = { fn, datas: [] }
// 	this._ee3.once(event, fn)
// }
// workerEmit(event: string, data?: any) {
// 	this._onces[event].datas[process.$instance] = data
// 	if (this._onces[event].datas.length == process.$instances) {
// 		this.emit(event, this._onces[event].datas)
// 	}
// }



export function dispersedMs(ms: number, i: number, length: number) {
	return Math.round(i * (ms / length))
}
export function instanceMs(ms: number) {
	return Math.round(Math.max(process.$instance, 0) * (ms / process.$instances))
}



export function restifyBulkRoutes(server: restify.Server, parent: string, routes: { [route: string]: any }) {
	Object.keys(routes).forEach(function(key) {
		let split = key.split(':')
		let method = split[0]
		let url = split[1]
		server[method.toLowerCase()]('/api/' + parent + '/' + url, routes[key])
	})
}

export function restifyRoute<B = any, R = any>(route: (req: RestifyRequest<B>, res: RestifyResponse<R>, next: RestifyNext) => void) {
	return route
}

export function validBody(body: any, keys: Array<string>): void {
	if (!body) throw new errors.PreconditionFailedError('Undefined request body');
	if (Object.keys(body).length == 0) throw new errors.PreconditionFailedError('Empty request body');
	keys.forEach(function(k) {
		if (body[k] == null) throw new errors.PreconditionFailedError(`Missing "${k}" field`);
	})
}







export function keys(desc: string, obj: any) {
	console.log('\n' + clc.blue('/▼-▼-▼-▼-▼-▼  ' + clc.bold(desc) + '  ▼-▼-▼-▼-▼-▼/') + ' ')
	if (_.isUndefined(obj)) {
		console.log('\n' + clc.red('UNDEFINED'))
	} else if (_.isNull(obj)) {
		console.log('\n' + clc.red('NULL'))
	} else {
		let sendi: string = '\n'
		let fns: Array<string> = _.functionsIn(obj)
		let _fns: Array<string> = []
		let keys: Array<string> = _.difference(_.keysIn(obj), fns)
		let _keys: Array<string> = []

		{
			let i: number, len: number = keys.length
			for (i = 0; i < len; i++) {
				if (keys[i].charAt(0) == '_') {
					_keys.push(keys[i])
				}
			}
		}
		keys = _.difference(keys, _keys)

		{
			let i: number, len: number = keys.length
			if (len > 0) {
				sendi = sendi + '\n' + clc.blue('▼ PROPERTIES') + '\n'
			}
			for (i = 0; i < len; i++) {
				sendi = sendi + keys[i] + '\n'
			}
		}

		{
			let i: number, len: number = _keys.length
			if (len > 0) {
				sendi = sendi + '\n \n' + clc.blue('▼ _PROPERTIES') + '\n'
			}
			for (i = 0; i < len; i++) {
				sendi = sendi + _keys[i] + '\n'
			}
		}

		{
			let i: number, len: number = fns.length
			for (i = 0; i < len; i++) {
				if (fns[i].charAt(0) == '_') {
					_fns.push(fns[i])
				}
			}
		}
		fns = _.difference(fns, _fns)

		{
			let i: number, len: number = fns.length
			if (len > 0) {
				sendi = sendi + '\n \n' + clc.blue('▼ METHODS') + '\n'
			}
			for (i = 0; i < len; i++) {
				sendi = sendi + fns[i] + '()\n'
			}
		}

		{
			let i: number, len: number = _fns.length
			if (len > 0) {
				sendi = sendi + '\n \n' + clc.blue('▼ _METHODS') + '\n'
			}
			for (i = 0; i < len; i++) {
				sendi = sendi + _fns[i] + '()\n'
			}
		}

		console.log(sendi + '\n')
	}
	console.log('\n' + clc.blue('/▲-▲-▲-▲-▲-▲  ' + clc.bold(desc) + '  ▲-▲-▲-▲-▲-▲/') + '\n')
}




