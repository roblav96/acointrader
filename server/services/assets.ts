// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import pall from 'p-all'
import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from './http'
import * as ledger from './ledger'
import * as fiats from './fiats'
import * as forex from './forex'
import * as coinmarketcap from '../scrapers/coinmarketcap.com'
import * as localbitcoins from '../scrapers/localbitcoins.com'
import * as restcountries from '../scrapers/restcountries.eu'



export function start() {
	return Promise.resolve().then(function() {
		return r.table('assets').count().run()
	}).then(function(count: number) {
		// if (count > 0) return Promise.resolve();
		// return sync()
		return fiats.sync()
	})
}



function sync() {
	return Promise.resolve().then(function() {
		return Promise.all([
			// coinmarketcap.syncCryptoAssets(),
			localbitcoins.getFiatAssets(),
			restcountries.getFiatAssets(),
		])

	}).then(function(resolved) {


		// }).then(function() {
		// 	return r.table('assets').filter(
		// 		r.row('fiat').eq(true).and(r.row('crypto').eq(true))
		// 	).getField('symbol').run()

		// }).then(function(symbols: string[]) {
		// 	console.warn('sync > symbols >')
		// 	eyes.inspect(symbols)

		// 	if (symbols.length > 0) {
		// 		throw new errors.ConflictError(JSON.stringify(symbols))
		// 	}
		// 	// return ledger.syncAssets()

	})
}
















