// 

import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import moment from 'moment'



export function array2object<T>(items: Array<T>, key: string) {
	return items.reduce(function(prev, curr, i) {
		prev[curr[key]] = curr
		return prev
	}, {}) as { [key: string]: T }
}













