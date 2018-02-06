// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'

import pevent from 'p-event'
import r from './adapters/rethinkdb'
import redis from './adapters/redis'
import * as assets from './services/assets'
import * as ledger from './services/ledger'
import * as fiats from './services/fiats'
import * as forex from './services/forex'



function start(): Promise<void> {
	return Promise.resolve().then(function() {
		return ledger.pre()

	}).then(function() {
		return fiats.pre()

	}).then(function() {
		return utils.rxReadys.radios.onReady()

	}).then(function() {
		return fiats.start()
		// 	process.radio.emit(utils.rxReadys.assets.event)
		// 	return r.table('assets').filter(r.row('fiat').eq(true)).run()

		// }).then(function(items: Items.Asset[]) {
		// 	let symbols = items.map(v => v.symbol)
		// 	process.radio.emit('forex.start', symbols)
		// 	return Promise.resolve()

	}).catch(function(error) {
		console.error('MASTER start > error', errors.render(error))
		if (process.DEVELOPMENT) return Promise.resolve();
		return pevent(process.ee3, shared.enums.EE3.TICK_5).then(() => start())
	})
}



if (process.MASTER) {

	start()

} else {

	process.radio.once('forex.start', forex.start)

}





// utils.rxReadys.assets.subscribe(function() {
// 	if (process.MASTER) return;
// 	return Promise.resolve().then(function() {
// 		return r.table('assets').filter(r.row('fiat').eq(true)).run()
// 	}).then(function(items: Items.Asset[]) {
// 		console.log('items.length', items.length)

// 	})
// })





// utils.rxready.assets.filter(v => !!v).take(1).subscribe(function() {

// 	// if (process.MASTER) {
// 	// 	Promise.resolve().then(function() {
// 	// 		return ledger.client.assets.queryAll()
// 	// 	}).then(function(assets: any[]) {

// 	// 	}).catch(function(error) {
// 	// 		console.error('start > error', errors.render(error))
// 	// 	})
// 	// }

// 	// return Promise.resolve().then(function() {

// 	// })


// 	// console.log('utils.rxready.assets.value', utils.rxready.assets.value)

// 	// ledger.

// })





// Promise.resolve().then(function() {
// 	if (process.MASTER) return ledger.initKeys();
// 	return Promise.resolve(true)

// }).then(function() {
// 	if (process.MASTER) return assets.init();
// 	return Promise.resolve()

// }).then(function() {
// 	return new Promise(function(resolve) {
// 		utils.rxready.radios.filter(v => !!v).take(1).subscribe(resolve)
// 	})

// }).then(function() {
// 	// return ledger.initKeys()

// }).then(function() {
// 	// console.warn('initKeys > done')

// }).catch(function(error) {
// 	console.error('start > error', errors.render(error))
// })






