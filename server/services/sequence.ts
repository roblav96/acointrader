// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import pall from 'p-all'
import * as sequence from 'sequence-sdk'
import * as forex from './forex'
import r from '../adapters/rethinkdb'



let ledger: sequence.Client

function init() {
	// if (!utils.isMaster()) return;

	ledger = new sequence.Client({
		ledger: 'development',
		credential: process.$webpack.sequence,
	})

	Promise.resolve().then(function() {
		return readyKeys()

	}).then(function() {
		return readyAssets()

	}).then(function() {
		utils.ready.ledger.next(true)

	}).catch(function(error) {
		console.error('init > error', errors.render(error))
	})

	// return new Promise(function(resolve) {
	// 	utils.ready.forex.filter(v => !!v).take(1).subscribe(resolve)
	// })

}

utils.ready.radios.filter(v => !!v).take(1).subscribe(init)



function readyKeys() {
	return Promise.resolve().then(function() {
		return ledger.keys.queryAll()
	}).then(function(keys: Array<any>) {
		if (!_.isEmpty(keys)) return Promise.resolve();
		if (!utils.isMaster()) {
			throw new errors.FailedDependencyError('Ledger KEYS are not ready!')
		}
		let ids = ['master', 'transactions', 'contracts', 'accounts', 'assets']
		return Promise.all(ids.map(v => createKey(v))).then(function() {
			process.exit(0)
			throw new errors.FailedDependencyError('RESTART')
		})
	})
}

function createKey(alias: string) {
	return Promise.resolve().then(function() {
		return ledger.keys.create({ alias })
	}).then(function(result) {
		return Promise.resolve(!!result)
	}).catch(function(error) {
		console.error('createKey > error', errors.render(error))
		return Promise.resolve(false)
	})
}



function readyAssets() {
	return Promise.resolve().then(function() {
		return ledger.assets.queryAll()
	}).then(function(assets: Array<any>) {
		if (!_.isEmpty(assets)) return Promise.resolve();
		if (!utils.isMaster()) {
			throw new errors.FailedDependencyError('Ledger ASSETS are not ready!')
		}
		return r.table('assets').run().then(function(assets: Array<Items.Asset>) {
			let keys = ['master', 'assets']
			return pall(assets.map(v => () => createAsset(v, keys)), { concurrency: 10 })
		}).then(function() {
			process.exit(0)
			throw new errors.FailedDependencyError('RESTART')
		})
	})
}

function createAsset(asset: Items.Asset, keys: Array<string>) {
	console.log('asset.id', asset.id)
	return Promise.resolve().then(function() {
		return ledger.assets.create({
			alias: asset.id,
			keys: keys.map(v => ({ id: v, alias: v })),
			quorum: keys.length,
			tags: asset,
		})
	}).then(function(result) {
		return Promise.resolve(!!result)
	}).catch(function(error) {
		console.error('createAsset > error', errors.render(error))
		return Promise.resolve(false)
	})
}











