// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'

import * as assets from './services/assets'
import * as ledger from './services/ledger'



Promise.resolve().then(function() {
	if (process.MASTER) return ledger.initKeys();
	return Promise.resolve(true)

}).then(function() {
	if (process.MASTER) return assets.init();
	return Promise.resolve(true)

}).then(function() {
	return new Promise(function(resolve) {
		utils.rxready.radios.filter(v => !!v).take(1).subscribe(resolve)
	})

}).then(function() {
	return ledger.initKeys()

}).then(function() {
	// console.warn('initKeys > done')

}).catch(function(error) {
	console.error('start > error', errors.render(error))
})



process.radio.once('rxready.assets', function(ready: boolean) {
	utils.rxready.assets.next(ready)
})




