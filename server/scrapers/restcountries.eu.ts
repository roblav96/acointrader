//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from '../services/http'



export function syncCountries() {
	return Promise.resolve().then(function() {
		return http.get('https://restcountries.eu/rest/v2/all')
	}).then(function(response) {
		return r.table('countries').insert(response, { conflict: 'update' }).run()
	}).then(function() {
		console.info('syncCountries > DONE')
		return Promise.resolve(true)
	}).catch(function(error) {
		console.error('syncCountries > error', errors.render(error))
		return Promise.resolve(false)
	})
}












