// 

import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import moment from 'moment'



/** ⟶ truthy check for any valid value */
export function isBad<T>(value: T): boolean {
	return value == null || (typeof value == 'number' && !Number.isFinite(value as any))
}

/** ⟶ truthy check for any invalid value */
export function isGood<T>(value: T): boolean {
	return !isBad(value)
}



/** ⟶ converts an array to a dictionary mapped object */
export function array_2_dictionary<T>(items: Array<T>, key: string): { [key: string]: T } {
	return items.reduce(function(prev, curr, i) {
		prev[curr[key]] = curr
		return prev
	}, {})
}



/** ⟶ only valid source key values and invalid target key values are merged with target */
export function repair_safely<T>(target: T, source: T): void {
	if (_.isEmpty(source)) return;
	Object.keys(source).forEach(function(key) {
		let tvalue = target[key]
		let svalue = source[key]
		if (isBad(tvalue) && isGood(svalue)) target[key] = svalue;
	})
}



/** ⟶ only valid source key values are merged with target */
export function merge_safely<T>(target: T, source: T): void {
	if (_.isEmpty(source)) return;
	Object.keys(source).forEach(function(key) {
		let svalue = source[key]
		if (isGood(svalue)) target[key] = svalue;
	})
}



/** ⟶ merge source array of dictionaries with target array of dictionaries by the unique key */
export function array_merge_safely<T>(target: Array<T>, source: Array<T>, uniqueKey: string): void {
	if (_.isEmpty(source)) return;

	source.forEach(function(item, i) {
		let found = target.find(v => v && v[uniqueKey] == item[uniqueKey])
		if (found) merge_safely(found, item);
		else target.push(item);
	})

}



/** ⟶ same as _.uniqBy except it only merges valid key values in ascending order */
export function array_uniqby_safely<T>(items: Array<T>, uniqueKey: string) {
	if (!Array.isArray(items) || items.length == 0) return items;

	items.forEach(function(item, i) {
		let iii = items.findIndex((vv, ii) => ii < i && vv && vv[uniqueKey] == item[uniqueKey])
		if (iii == -1) return;
		merge_safely(items[iii], item)
		items[i] = null
	})

	let i: number, len = items.length
	for (i = len; i--;) {
		let item = items[i]
		if (item == null) items.splice(i, 1);
	}

	return items
}



/** ⟶ move an item from index to a specific index */
export function array_move<T>(items: Array<T>, from: number, to: number) {
	if (to === from) return items;
	let target = items[from]
	let increment = to < from ? -1 : 1
	for (let k = from; k != to; k += increment) {
		items[k] = items[k + increment]
	}
	items[to] = target
}



/** ⟶ clones the argument using JSON.stringify and JSON.parse */
export function clone<T = any>(input: T): T {
	return JSON.parse(JSON.stringify(input))
}

export function randomBytes(length = 32) {
	let btyes = ''
	while (btyes.length < length && length > 0) {
		let rand = Math.random()
		btyes += (rand < 0.1 ? Math.floor(rand * 100) : String.fromCharCode(Math.floor(rand * 26) + (rand > 0.5 ? 97 : 65)))
	}
	return btyes
}

export function parseId(id: string) {
	return id.toLowerCase().replace(/\@W+/g, '').trim()
}

export function cleanString(input: string) {
	return input.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s\s+/g, ' ')
}

export function cleanSearch(input: string) {
	return input.toLowerCase().replace(/[^a-zA-Z0-9]/g, '').trim()
}



export function isValidEmail(email: string) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}





Object.assign(window, {
	breakpoints: `

`	,
})

/*
Extra Small	xs	Small to large handset	0 ‡ 600
Small	sm	Small to medium tablet	960
Medium	md	Large tablet to laptop	1264
Large	lg	Desktop	1264px 1904px
Extra Large	xl	4k and ultra-wides	1904px
*/







