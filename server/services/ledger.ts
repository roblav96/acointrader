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



function createAsset(item: Items.Asset, keys = ['master', 'assets']) {
	console.log('createAsset > item.id', item.id)
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
		let plucks = ['id', 'name', 'logo', 'fiat', 'crypto', 'coin', 'token']
		return r.table('assets').pluck(plucks as any).run()

	}).then(function(items: Items.Asset[]) {
		return utils.radioMaster('syncAssets', items)

	}).then(function(results) {
		console.log('utils.radioMaster', results)
		
	})
}

utils.radioWorkerAddListener('syncAssets', function (items: Items.Asset[]) {
	let chunks = shared.array.chunks(items, process.$instances)[process.$instance]
	console.log('chunks.length', chunks.length)
	return Promise.resolve().then(function() {
		return client.assets.queryAll({
			
		})
	})
})

// utils.rxReadys.radios.onReady().then(function() {
// 	console.info('utils.rxReadys.radios.ready', utils.rxReadys.radios.ready)
// })

// process.radio.addListener('w.ledger.syncAssets', function() {

// })




