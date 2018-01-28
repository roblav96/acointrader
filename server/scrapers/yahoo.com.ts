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
import * as http from '../services/http'



export function syncAssets() {
	return Promise.resolve().then(function() {
		
		

	}).then(function() {
		console.warn('syncAssets > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}












