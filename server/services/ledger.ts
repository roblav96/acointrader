// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import pevent from 'p-event'
import pforever from 'p-forever'
import * as sequence from 'sequence-sdk'
import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from './http'



const KEYS = ['master', 'transactions', 'contracts', 'accounts', 'assets']



export const client = new sequence.Client(process.$webpack.sequence)



function createKey(alias: string) {
	return Promise.resolve().then(function() {
		return client.keys.create({ alias })
	}).then(function(result) {
		return Promise.resolve(!!result)
	}).catch(function(error) {
		console.error('createKey > error', errors.render(error))
		return Promise.resolve(false)
	})
}

export function initKeys() {
	return Promise.resolve().then(function() {
		return client.keys.queryAll()
	}).then(function(keys: Array<any>) {
		if (!_.isEmpty(keys)) return Promise.resolve(true);
		return Promise.all(KEYS.map(v => createKey(v))).then(function() {
			return Promise.resolve(true)
		})
	}).catch(function(error) {
		console.error('initKeys > error', errors.render(error))
		return Promise.resolve(false)
	})
}






