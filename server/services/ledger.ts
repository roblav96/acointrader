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
import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from './http'

import * as sequence from 'sequence-sdk'
import * as sequence_shared from 'sequence-sdk/dist/shared'



declare global {
	namespace Ledger {

	}
}



export const client = new sequence.Client(process.$webpack.sequence)



const KEYS = ['master', 'treasury', 'user']

export function initKeys() {
	return Promise.resolve().then(function() {
		return client.keys.queryAll()
	}).then(function(keys: sequence_shared.Key[]) {
		let dkeys = _.difference(KEYS, keys.map(v => !!v && v.alias))
		if (_.isEmpty(dkeys)) return Promise.resolve();
		return pall(
			dkeys.map(v => () => createKey(v)), { concurrency: 1 }
		).then(() => Promise.resolve())
	})
}

function createKey(alias: string): Promise<void> {
	console.log('createKey >', alias)
	return Promise.resolve().then(function() {
		return pevent(process.ee3, shared.enums.EE3.TICK_01)
	}).then(function() {
		return client.keys.create({ alias })
	}).then(() => Promise.resolve()).catch(function(error) {
		console.error('createKey > error', errors.render(error))
		return pevent(process.ee3, shared.enums.EE3.TICK_1).then(function() {
			return createKey(alias)
		})
	})
}



function createAsset(item: Items.Asset, keys = ['treasury']): Promise<void> {
	console.log('createAsset >', item.symbol)
	return Promise.resolve().then(function() {
		return pevent(process.ee3, shared.enums.EE3.TICK_1)
	}).then(function() {
		return client.assets.create({
			alias: item.symbol,
			keys: keys.map(v => ({ id: v, alias: v })),
			quorum: keys.length,
			tags: item,
		})
	}).then(() => Promise.resolve()).catch(function(error) {
		console.error('createAsset > error', errors.render(error))
		return pevent(process.ee3, shared.enums.EE3.TICK_1).then(function() {
			return createAsset(item, keys)
		})
	})
}

export function syncAssets() {
	return Promise.resolve().then(function() {
		let plucks = ['symbol', 'name', 'logo', 'fiat', 'crypto', 'coin', 'token'] as Array<keyof Items.Asset>
		return r.table('assets').pluck(plucks as any).run()

		// }).then(function(items: Items.Asset[]) {
		// 	return utils.radioMaster('syncAssets', items)

		// }).then(function(results) {
		// 	console.warn('syncAssets > results >')
		// 	eyes.inspect(results)

	})
}

function syncAssetsWorker(items: Items.Asset[]) {
	if (process.DEVELOPMENT && !process.PRIMARY) return utils.radioWorkerEmit('syncAssets', []);

	let chunk = shared.array.chunks(items, process.$instances)[process.$instance]
	return Promise.resolve().then(function() {

		let filter = chunk.reduce(function(previous: string, current: Items.Asset, i: number) {
			if (i == 0) return previous;
			return previous + ' OR alias=$' + (i + 1)
		}, 'alias=$1')
		let filterParams = chunk.map(v => v.symbol)

		return client.assets.queryAll({
			filter, filterParams,
		})

	}).then(function(assets: any[]) {
		console.log('assets >')
		eyes.inspect(assets)
		console.log('assets.length', assets.length)

		// _.remove(chunk, function(item, i) {
		// 	return false
		// })
		// if (_.isEmpty(chunk)) return Promise.resolve();

		return pall(
			chunk.map(v => () => createAsset(v)), { concurrency: 1 }
		).then(() => Promise.resolve())

	}).catch(function(error) {
		console.error('syncAssetsWorker > error', errors.render(error))
		return Promise.resolve()

	}).then(() => utils.radioWorkerEmit('syncAssets'))

}
utils.radioWorkerAddListener('syncAssets', syncAssetsWorker)





// utils.rxReadys.radios.onReady().then(function() {
// 	console.info('utils.rxReadys.radios.ready', utils.rxReadys.radios.ready)
// })

// process.radio.addListener('w.ledger.syncAssets', function() {

// })




