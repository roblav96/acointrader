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
import * as forex from './forex'
import * as coinmarketcap from '../scrapers/coinmarketcap.com'
import * as localbitcoins from '../scrapers/localbitcoins.com'



export const SKIPS = {
	cryptos: ['TOP', 'XAU', 'MAD'],
	fiats: ['BSD', 'SBD', 'ALL', 'CRC', 'XPD'],
}



export function init() {
	return Promise.resolve().then(function() {
		return r.table('assets').count().run()
	}).then(function(count: number) {
		if (!!count) return Promise.resolve();
		return sync()
	})
}



function sync() {
	return Promise.resolve().then(function() {
		return Promise.all([
			coinmarketcap.syncCryptos(SKIPS.cryptos),
			localbitcoins.syncFiats(SKIPS.fiats),
		])
	}).then(function() {
		return ledger.syncAssets()
	})
}



// process.radio.addListener('assets.sync.ledger', function() {

// 	process.radio.wonce('assets.sync', function(datas) {
// 		console.warn('assets.sync > DONE', datas)
// 	})

// 	if (process.MASTER) return;

// 	return Promise.resolve().then(function() {
// 		let plucks = ['id', 'name', 'logo', 'fiat', 'crypto', 'coin', 'token']
// 		return r.table('assets').pluck(plucks as any).run()

// 	}).then(function(items: Array<Items.Asset>) {
// 		let chunks = shared.array.chunks(items, process.$instances)[process.$instance]
// 		console.log('chunks.length', chunks.length)

// 		process.radio.wemit('assets.sync', chunks.length)

// 	})

// })












