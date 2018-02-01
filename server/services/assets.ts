// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import pevent from 'p-event'
import pforever from 'p-forever'
import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from './http'
import * as yahoo from '../scrapers/yahoo.com'
import * as coinmarketcap from '../scrapers/coinmarketcap.com'



export function init() {
	return Promise.resolve().then(function() {
		return r.table('assets').count().run()
	}).then(function(count: number) {
		if (process.DEVELOPMENT && !!count) return Promise.resolve();
		return coinmarketcap.syncAssets().then(function() {
			
		})
	})
}

export function syncAssets() {
	return coinmarketcap.syncAssets().then(function() {

	})
}









