// 

export * from './enums'
export * from './security-utils'
export * from './exchange-utils'



import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import url from 'url'



export function noop(): void { }

export const isNode = new Function('try { return this === global; } catch(e) { return false }')



export function isValidEmail(email: string) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}



export function isBad<T>(value: T): boolean {
	return value == null || (typeof value == 'number' && !Number.isFinite(value as any))
}

export function isGood<T>(value: T): boolean {
	return !isBad(value)
}



export function fixResponse(response: any): void {
	if (_.isEmpty(response)) return;
	Object.keys(response).forEach(function(key) {
		// if (key == 'id') return;
		let value = response[key] as string
		if (typeof value != 'string' || value === '') return;
		if (!isNaN(value as any) && value.match(/[^0-9.-]/) == null) {
			response[key] = Number.parseFloat(value)
		} else if (['true', 'false'].indexOf(value) == 0) {
			response[key] = JSON.parse(value)
		}
	})
}



export const json = {
	parse<T>(target: T): T {
		if (target == null || !_.isString(target)) return target;
		if (target.charAt(0) == '{' && target.charAt(target.length - 1) == '}') return JSON.parse(target);
		if (target.charAt(0) == '[' && target.charAt(target.length - 1) == ']') return JSON.parse(target);
		return target
	},
}



export const string = {
	toId(id: string, toLowerCase = false) {
		if (!_.isString(id)) return id;
		id = id.replace(/\W+/g, '').trim()
		return !toLowerCase ? id : id.toLowerCase()
	},
	parseInt(input: string) {
		return Number.parseInt(input.replace(/[^0-9\.]/g, ''))
	},
	parseFloat(input: string) {
		return Number.parseFloat(input.replace(/[^0-9\.]/g, ''))
	},
	parseExchangeId(website: string) {
		let parsed = url.parse(website)
		let split = parsed.hostname.split('.')
		if (split[0] == 'www') split.shift();
		return string.toId(split[0], true)
	},
	parseUrl(website: string) {
		return url.parse(website)
	},
}
if (process.CLIENT) (global as any).string = string;



export const object = {
	clone<T>(target: T): T {
		return JSON.parse(JSON.stringify(target))
	},
	compact<T>(target: T): void {
		Object.keys(target).forEach(function(key) {
			let value = target[key]
			if (Number.isFinite(value)) return;
			if (!value) _.unset(target, key);
		})
	},
	merge<T>(target: T, source: T): void {
		if (_.isEmpty(source)) return;
		Object.keys(source).forEach(function(key) {
			let svalue = source[key]
			if (svalue != null) target[key] = svalue;
		})
	},
	repair<T>(target: T, source: T): void {
		if (_.isEmpty(source)) return;
		Object.keys(source).forEach(function(key) {
			let tvalue = target[key]
			let svalue = source[key]
			if (tvalue == null && svalue != null) target[key] = svalue;
		})
	},
}
if (process.CLIENT) (global as any).object = object;



export const array = {
	chunks<T>(items: Array<T>, nchunks: number): Array<Array<T>> {
		let chunks = Array.from(Array(nchunks), v => []) as Array<Array<T>>
		items.forEach((v, i) => chunks[i % chunks.length].push(v))
		return chunks
	},
}
if (process.CLIENT) (global as any).array = array;









