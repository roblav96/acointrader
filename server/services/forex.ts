// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import uws from 'uws'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from './http'



export const FIATS = [] as Array<string>
export const PAIRS = [] as Array<string>



export function start() {
	return Promise.resolve().then(function() {
		return r.table('assets').filter(r.row('fiat').eq(true)).run()

	}).then(function(assets: Array<Items.Asset>) {
		console.log('assets >')
		eyes.inspect(assets)

	}).then(function() {
		console.warn('syncAssets > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}



if (utils.isMaster()) {


}



