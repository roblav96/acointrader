// 

import cluster from 'cluster'
import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import restify from 'restify'
import errors from 'restify-errors'

import rx from 'rxjs/Rx'



export const ready = {
	radios: new rx.BehaviorSubject(false),
	restify: new rx.BehaviorSubject(false),
	forex: new rx.BehaviorSubject(false),
}



export function isPrimary() {
	return process.$instance == 0
}
export function isMaster() {
	return cluster.isMaster
}
export function isCaboose() {
	return process.$instance == process.$instances - 1
}



export function dispersedMs(ms: number, i: number, length: number) {
	return Math.round(i * (ms / length))
}
export function instanceMs(ms: number) {
	// return dispersedMs(ms, Math.max(process.$instance, 0), process.$instances)
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




