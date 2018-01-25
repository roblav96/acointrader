// 

import enums from './enums'
export { enums }

import * as security from './security-utils'
export { security }



import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'



export function parseId(id: string, toLowerCase = false) {
	if (!_.isString(id)) return id;
	id = id.replace(/\W+/g, '').trim()
	return !toLowerCase ? id : id.toLowerCase()
}
if (process.CLIENT) (global as any).parseId = parseId;



export function isValidEmail(email: string) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}



export function isBad<T>(value: T): boolean {
	return value == null || (typeof value == 'number' && !Number.isFinite(value as any))
}

export function isGood<T>(value: T): boolean {
	return !isBad(value)
}



export const object = {
	compact<T>(target: T): void {
		Object.keys(target).forEach(function(k, i) {
			if (target[k] == null) _.unset(target, k);
			// if (isBad(target[k])) _.unset(target, k);
		})
	},
}










