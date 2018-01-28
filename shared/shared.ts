// 

export * from './enums'
export * from './security-utils'



import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import url from 'url'



export function noop(): void { }



export function isValidEmail(email: string) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}



export function isBad<T>(value: T): boolean {
	return value == null || (typeof value == 'number' && !Number.isFinite(value as any))
}

export function isGood<T>(value: T): boolean {
	return !isBad(value)
}



export const json = {
	safeParse<T>(target: T): T {
		if (target == null || !_.isString(target)) return target;
		if (target.charAt(0) != '{' || target.charAt(target.length - 1) != '}') return target;
		return JSON.parse(target)
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
		Object.keys(target).forEach(function(k, i) {
			if (!target[k]) _.unset(target, k);
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









