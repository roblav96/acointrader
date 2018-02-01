// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from './http'
import * as ledger from './ledger'
import * as coinmarketcap from '../scrapers/coinmarketcap.com'
import * as localbitcoins from '../scrapers/localbitcoins.com'
import * as restcountries from '../scrapers/restcountries.eu'
import * as coinhills from '../scrapers/coinhills.com'



export const FIATS = ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'USD', 'ZAR']



export function init() {
	return Promise.resolve().then(function() {
		// return r.table('assets').count().run()
		// }).then(function(count: number) {
		// if (process.DEVELOPMENT && !!count) return Promise.resolve(true);
		// 	return coinmarketcap.syncCryptos()
		// }).then(function() {
		// 	return localbitcoins.syncFiats()
		return Promise.all([
			// coinmarketcap.syncCryptos(),
			localbitcoins.syncFiats(),
			restcountries.syncFiats(),
			// coinhills.syncFiats(),
		])
	}).then(function() {
		return new Promise<boolean>(function(resolve) {
			utils.rxready.radios.filter(v => !!v).take(1).subscribe(resolve)
		})
	}).then(function() {
		process.radio.emit('rxready.assets')
		return Promise.resolve(true)
	})
}












