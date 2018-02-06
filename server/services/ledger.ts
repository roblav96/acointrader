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



const KEYS = ['master', 'server', 'treasury', 'exchange']

export function preKeys(): Promise<void> {
	return Promise.resolve().then(function() {
		return client.keys.queryAll()
	}).then(function(keys: Ledger.Key[]) {
		let dkeys = _.difference(KEYS, keys.map(v => v.alias))
		if (_.isEmpty(dkeys)) return Promise.resolve();
		return pall(
			dkeys.map(v => () => {
				return pevent(process.ee3, shared.enums.EE3.TICK_01).then(() => createKey(v))
			}), { concurrency: 1 }
		).then(() => Promise.resolve())
	})
}

function createKey(alias: string): Promise<void> {
	console.log('createKey >', alias)
	return Promise.resolve().then(function() {
		return client.keys.create({ alias })
	}).catch(function(error) {
		console.error('createKey > error', errors.render(error))
		return pevent(process.ee3, shared.enums.EE3.TICK_3).then(() => createKey(alias))
	})
}



export function insertAssets(items: Items.Asset[]): Promise<void> {
	return Promise.resolve().then(function() {
		let plucks = ['symbol', 'name', 'fiat', 'commodity', 'crypto'] as (keyof Items.Asset)[]
		items = items.map(v => _.pick(v, plucks))
		return utils.radioMaster('insertAssets', items)
	}).then(() => Promise.resolve())
}

utils.radioWorkerAddListener('insertAssets', function(items: Items.Asset[]) {
	let chunk = shared.array.ichunk(items)
	return Promise.resolve().then(function() {
		return client.assets.queryAll({
			filter: chunk.reduce(function(previous: string, current: Items.Asset, i: number) {
				if (i == 0) return previous;
				return previous + ' OR alias=$' + (i + 1)
			}, 'alias=$1'),
			filterParams: chunk.map(v => v.symbol),
		})

	}).then(function(assets: Ledger.Asset<Items.Asset>[]) {
		let symbols = assets.map(v => v.alias)
		_.remove(chunk, v => symbols.indexOf(v.symbol) >= 0)
		if (_.isEmpty(chunk)) return Promise.resolve();
		return pall(
			chunk.map(v => () => {
				return pevent(process.ee3, shared.enums.EE3.TICK_1).then(() => createAsset(v))
			}), { concurrency: 1 }
		).then(() => Promise.resolve())

	}).catch(function(error) {
		console.error('insertAssets > error', errors.render(error))
		return Promise.resolve()

	}).then(() => utils.radioWorkerEmit('insertAssets'))

})

function createAsset(item: Items.Asset, keys = ['master', 'server', 'treasury']): Promise<void> {
	console.log('createAsset >', item.symbol);
	return Promise.resolve().then(function() {
		return client.assets.create({
			alias: item.symbol,
			keys: keys.map(v => ({ id: v, alias: v })),
			quorum: keys.length,
			tags: item,
		})
	}).catch(function(error) {
		console.error('createAsset > error', errors.render(error))
		return pevent(process.ee3, shared.enums.EE3.TICK_3).then(() => createAsset(item, keys))
	})
}







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







// export function preAssets(): Promise<void> {
// 	return Promise.resolve().then(function() {
// 		return client.assets.queryPage({ pageSize: 1 })
// 	}).then(function(page: Ledger.Page<Ledger.Asset>) {
// 		console.log('preAssets > page >')
// 		eyes.inspect(page)
// 		console.log('preAssets > page.items.length', page.items.length)
// 		// if (!_.isEmpty(page.items)) return Promise.resolve();
// 		// return syncAssets()
// 	})
// }

// export function syncAssets(): Promise<void> {
// 	return Promise.resolve().then(function() {
// 		let plucks = ['symbol', 'name', 'fiat', 'commodity', 'crypto'] as (keyof Items.Asset)[]
// 		return r.table('assets').pluck(plucks as any).run()
// 	}).then(function(items: Items.Asset[]) {
// 		return utils.radioMaster('syncAssets', items)
// 	}).then(function() {
// 		return Promise.resolve()
// 	})
// }







