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



import * as seq_shared from 'sequence-sdk/dist/shared'
import * as seq_page from 'sequence-sdk/dist/page'

declare global {
	namespace Ledger {
		interface Key extends seq_shared.Key { }
		interface Asset<T = any> extends seq_shared.CreateRequest {
			id: string
			contractVersion: number
			tags: T
		}
		interface Page<T = any> extends seq_page.Page {
			client: sequence.Client
			next: { page_size: number, after: string, type: string }
			items: T[]
		}
	}
}



export const client = new sequence.Client(process.$webpack.sequence)



const KEYS = ['master', 'treasury', 'user']

export function preKeys() {
	return Promise.resolve().then(function() {
		return client.keys.queryAll()
	}).then(function(lkeys: Ledger.Key[]) {
		let dkeys = _.difference(KEYS, lkeys.map(v => !!v && v.alias))
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



export function preAssets() {
	return Promise.resolve().then(function() {
		return client.assets.queryPage({ pageSize: 5 })
	}).then(function(page: Ledger.Page<Ledger.Asset>) {
		if (!_.isEmpty(page.items)) return Promise.resolve();
		return syncAssets()
	})
}

export function syncAssets() {
	return Promise.resolve().then(function() {
		let plucks = ['symbol', 'name', 'logo', 'fiat', 'crypto', 'coin', 'token'] as Array<keyof Items.Asset>
		return r.table('assets').pluck(plucks as any).run()
	}).then(function(items: Items.Asset[]) {
		return utils.radioMaster('syncAssets', items)
	}).then(function() {
		return Promise.resolve()
	})
}

utils.radioWorkerAddListener('syncAssets', function(items: Items.Asset[]) {
	// if (process.DEVELOPMENT && !process.PRIMARY) return utils.radioWorkerEmit('syncAssets', []);
	let chunk = shared.array.ichunk(items)
	return Promise.resolve().then(function() {
		let filter = chunk.reduce(function(previous: string, current: Items.Asset, i: number) {
			if (i == 0) return previous;
			return previous + ' OR alias=$' + (i + 1)
		}, 'alias=$1')
		let filterParams = chunk.map(v => v.symbol)
		return client.assets.queryAll({
			filter, filterParams,
		})

	}).then(function(assets: Ledger.Asset<Items.Asset>[]) {
		let asymbols = assets.map(v => v.alias)
		_.remove(chunk, v => asymbols.indexOf(v.symbol) >= 0)
		if (_.isEmpty(chunk)) return Promise.resolve();
		return pall(
			chunk.map(v => () => createAsset(v)), { concurrency: 1 }
		).then(() => Promise.resolve())

	}).catch(function(error) {
		console.error('syncAssetsWorker > error', errors.render(error))
		return Promise.resolve()

	}).then(() => utils.radioWorkerEmit('syncAssets'))

})

function createAsset(item: Items.Asset, keys = ['treasury']): Promise<void> {
	if (process.PRIMARY) console.log('createAsset >', item.symbol);
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







