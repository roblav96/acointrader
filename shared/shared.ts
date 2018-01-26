// 

import enums from './enums'
export { enums }

import * as security from './security-utils'
export { security }



import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'



export function isValidEmail(email: string) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}



export function isBad<T>(value: T): boolean {
	return value == null || (typeof value == 'number' && !Number.isFinite(value as any))
}

export function isGood<T>(value: T): boolean {
	return !isBad(value)
}



export const string = {
	toId(id: string, toLowerCase = false): string {
		if (!_.isString(id)) return id;
		id = id.replace(/\W+/g, '').trim()
		return !toLowerCase ? id : id.toLowerCase()
	},
}
if (process.CLIENT) (global as any).string = string;



export const object = {
	clone<T>(target: T): T {
		return JSON.parse(JSON.stringify(target))
	},
	compact<T>(target: T): void {
		Object.keys(target).forEach(function(k, i) {
			if (target[k] == null) _.unset(target, k);
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










