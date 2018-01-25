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










