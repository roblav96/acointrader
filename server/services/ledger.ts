// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import pall from 'p-all'
import pevent from 'p-event'
import pforever from 'p-forever'
import * as sequence from 'sequence-sdk'
import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from './http'



export const client = new sequence.Client(process.$webpack.sequence)



const KEYS = ['master', 'transactions', 'contracts', 'accounts', 'assets']

export function initKeys() {
	return Promise.resolve().then(function() {
		return client.keys.queryAll()
	}).then(function(keys: any[]) {
		if (!_.isEmpty(keys)) return Promise.resolve();
		return pall(
			KEYS.map(v => () => createKey(v)), { concurrency: 1 }
		).then(() => Promise.resolve())
	})
}

function createKey(alias: string) {
	return Promise.resolve().then(function() {
		return client.keys.create({ alias })
	}).then(function(result) {
		return Promise.resolve()
	})
}



// function initAssets() {
// 	return Promise.resolve().then(function() {
// 		return client.assets.queryAll()
// 	}).then(function(assets: any[]) {
// 		if (!_.isEmpty(assets)) return Promise.resolve();

// 		let plucks = ['id', 'name', 'logo', 'fiat', 'crypto', 'coin', 'token']
// 		return r.table('assets').pluck(plucks as any).run().then(function(items: Array<Items.Asset>) {
// 			let keys = ['master', 'assets']
// 			return pall(items.map(v => () => createAsset(v, keys)), { concurrency: 1 })
// 		}).then(function() {
// 			process.exit(0)
// 			throw new errors.FailedDependencyError('RESTART')
// 		})
// 	})
// }

function createAsset(item: Items.Asset, keys = ['master', 'assets']) {
	console.log('item.id', item.id)
	return Promise.resolve().then(function() {
		return client.assets.create({
			alias: item.id,
			keys: keys.map(v => ({ id: v, alias: v })),
			quorum: keys.length,
			tags: item,
		})
	}).then(function(result) {
		return Promise.resolve(!!result)
	}).catch(function(error) {
		console.error('createAsset > error', errors.render(error))
		return Promise.resolve(false)
	})
}

export function syncAssets() {
	return Promise.resolve().then(function() {
		return utils.rxReadys.radios.onReady()

	}).then(function() {
		return utils.radioMaster('workerSyncAssets')

	})
}

function workerSyncAssets(event: string) {
	return Promise.resolve().then(function() {
		console.log('workerSyncAssets', event)
	})
}
utils.radioWorkerListener('workerSyncAssets', workerSyncAssets)

// utils.rxReadys.radios.onReady().then(function() {
// 	console.info('utils.rxReadys.radios.ready', utils.rxReadys.radios.ready)
// })

// process.radio.addListener('w.ledger.syncAssets', function() {

// })




