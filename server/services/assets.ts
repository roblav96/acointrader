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
import * as coinmarketcap from '../scrapers/coinmarketcap.com'
import * as cryptocompare from '../scrapers/cryptocompare.com'
import * as localbitcoins from '../scrapers/localbitcoins.com'



const SKIPS = {
	cryptos: ['TOP', 'XAU', 'MAD'],
	fiats: ['BSD', 'SBD', 'ALL', 'CRC', 'XPD'],
}



export function init() {
	return Promise.resolve().then(function() {
		return r.table('assets').count().run()

	}).then(function(count: number) {
		// if (!!count) return Promise.resolve();
		return sync()

	}).then(function() {
		return new Promise(function(resolve) {
			utils.rxready.radios.filter(v => !!v).take(1).subscribe(resolve)
		})

	}).then(function() {
		process.radio.emit('rxready.assets')
		return Promise.resolve()

	})
}

process.radio.once('rxready.assets', () => utils.rxready.assets.next(true))

// utils.rxready.assets.filter(v => !!v).take(1).subscribe(function() {

// })



function sync() {
	return Promise.resolve().then(function() {
		return Promise.all([
			coinmarketcap.syncCryptos(SKIPS.cryptos),
			localbitcoins.syncFiats(SKIPS.fiats),
		])

	}).then(function() {
		return cryptocompare.syncCryptos(SKIPS.cryptos)

	}).then(function() {
		return new Promise(function(resolve) {
			utils.rxready.radios.filter(v => !!v).take(1).subscribe(resolve)
		})

	}).then(function() {
		process.radio.emit('assets.sync')
		return Promise.resolve()

	})
}

process.radio.addListener('assets.sync', function() {

	utils.radioWorkersOnce('assets.syncz', function (datas) {
		console.warn('assets.syncz > DONE', datas)
	})

	if (process.MASTER) return;

	return Promise.resolve().then(function() {
		let plucks = ['id', 'name', 'logo', 'fiat', 'crypto', 'coin', 'token']
		return r.table('assets').pluck(plucks as any).run()

	}).then(function(items: Array<Items.Asset>) {
		let chunks = shared.array.chunks(items, process.$instances)[process.$instance]
		console.log('chunks.length', chunks.length)
		
		utils.radioWorkerEmit('assets.syncz', chunks.length)

	})

})












