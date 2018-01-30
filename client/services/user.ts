// 

import _ from 'lodash'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import * as security from './security'
import * as http from './http'



export const state = {
	currency: process.sls.get('user.currency') as string,
}



export function getCurrencies() {
	return Promise.resolve().then(function() {
		return http.get('/forex/currencies')
	})
}












