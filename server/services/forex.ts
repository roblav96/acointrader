// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import uws from 'uws'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from './http'



export const CURRENCIES = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR']
export const PAIRS = [] as Array<string>



if (utils.isMaster()) {
	CURRENCIES.forEach(function(base, i) {
		CURRENCIES.forEach(function(quote, i) {
			if (base == quote) return;
			PAIRS.push(base + quote + '=X')
		})
	})
	
	console.log('PAIRS >')
	eyes.inspect(PAIRS)
	
}



