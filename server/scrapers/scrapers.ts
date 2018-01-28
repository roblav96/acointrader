// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import pall from 'p-all'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as forex from '../services/forex'
import * as cryptominded from './cryptominded.com'
import * as coinclarity from './coinclarity.com'
import * as coinmarketcap from './coinmarketcap.com'
import * as coinapi from './coinapi.io'
import * as coinhills from './coinhills.com'
import * as localbitcoins from './localbitcoins.com'
import * as yahoo from './yahoo.com'



forex.initAssets()



export function syncAssets() {
	return pall([
		// () => r.table('assets').delete().run(),
		() => coinmarketcap.syncAssets(),
		() => localbitcoins.syncAssets(),
	], { concurrency: 1 }).then(function() {
		console.warn('syncAssets > DONE')
		return Promise.resolve(true)
	}).catch(function(error) {
		console.error('syncAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}



if (utils.isMaster()) {
	// cryptominded.exchanges.sync()
	// coinclarity.exchanges.sync()
	// coinmarketcap.sync()
	// coinhills.syncFiats()
	// localbitcoins.syncAssets()
	// syncAssets()
	// yahoo.start()

}













