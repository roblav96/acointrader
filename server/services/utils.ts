// 

import cluster from 'cluster'
import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import restify from 'restify'
import errors from 'restify-errors'



export function isPrimary() {
	return process.$instance == 0
}
export function isMaster() {
	return cluster.isMaster
}
export function isCaboose() {
	return process.$instance == process.$instances - 1
}



export function nextSecond(add = 0) {
	return moment().endOf('second').add(add, 'seconds').valueOf()
}
export function tillNextSecond(add = 0) {
	return nextSecond(add) - Date.now()
}
export function instanceMs(ms: number) {
	let instance = Math.max(process.$instance, 0)
	return _.round(instance * (ms / process.$instances))
}
export function instanceSecs(secs: number) {
	return instanceMs(secs * 1000)
}
export function dispersedMs(ms: number, i: number, length: number) {
	return _.round(i * (ms / length))
}
export function dispersedSecs(secs: number, i: number, length: number) {
	return dispersedMs(secs * 1000, i, length)
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

export function validate(body: any, keys: Array<string>): void {
	if (!body) throw new errors.PreconditionFailedError('Undefined request body');
	if (Object.keys(body).length == 0) throw new errors.PreconditionFailedError('Empty request body');
	keys.forEach(function(k) {
		if (body[k] == null) throw new errors.PreconditionFailedError(`Missing "${k}" field`);
	})
}




