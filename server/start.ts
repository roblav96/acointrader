// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'

import * as assets from './services/assets'
import * as ledger from './services/ledger'



if (process.MASTER) {
	Promise.resolve().then(function() {
		return ledger.initKeys()

	}).then(function() {
		return assets.init()

		// }).then(function() {
		// 	return ledger.client.assets.queryAll()

		// }).then(function(assets: any[]) {
		// 	if (!_.isEmpty(assets)) return Promise.resolve();


	}).catch(function(error) {
		console.error('process.MASTER start > error', errors.render(error))
	})
}



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






