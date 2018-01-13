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
export function array_merge_safely<T>(target: Array<T>, source: Array<T>, uniq_key: string): void {
	if (_.isEmpty(source)) return;

	source.forEach(function(item, i) {
		console.warn('item', i, JSON.stringify(item))
		let found = target.find(v => v && v[uniq_key] == item[uniq_key])
		console.log('found', JSON.stringify(found))
		if (found) merge_safely(found, item);
		else target.push(item);
	})

}



/** ⟶ same as _.uniqBy except it only merges valid key values in ascending order */
export function array_uniqby_safely<T>(items: Array<T>, uniq_key: string) {
	if (!Array.isArray(items) || items.length == 0) return items;

	items.forEach(function(item, i) {
		let iii = items.findIndex((vv, ii) => ii < i && vv && vv[uniq_key] == item[uniq_key])
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














