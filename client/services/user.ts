// 

import _ from 'lodash'
import * as shared from '../../shared/shared'
import * as utils from './utils'
import * as storage from './storage'
import * as security from './security'
import * as http from './http'



export const state = {
	country: storage.get('user.country', 'USA'),
	currency: storage.get('user.currency', 'USD'),
}



export function getCurrencies() {
	return Promise.resolve().then(function() {
		return http.get('/forex/currencies')
	})
}












