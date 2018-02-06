//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import * as errors from '../services/errors'
import * as shared from '../../shared/shared'
import * as utils from '../services/utils'

import forge from 'node-forge'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as security from '../services/security'



export default {



	'POST:save': utils.restifyRoute<any, any>(function(req, res, next) {
		Promise.resolve().then(function() {
			return r.table('users').get(req.doc.email).run()

		}).then(function(data) {
			let apiKey = shared.security.decrypt(req.body, data.privatePem) // as ExchangeApiKey
			return r.table('users').update({
				email: req.doc.email,
				apiKeys: { [apiKey.id]: apiKey },
			}).run()

		}).then(function() {
			res.send()
			return next()

		}).catch(function(error) {
			return next(errors.generate(error))
		})
	}),



	'POST:delete': utils.restifyRoute<any, any>(function(req, res, next) {
		Promise.resolve().then(function() {
			return r.table('users').get(req.doc.email).run()

		}).then(function(data) {
			let apiKey = shared.security.decrypt(req.body, data.privatePem) // as ExchangeApiKey
			return r.table('users').update({
				email: req.doc.email,
				apiKeys: { [apiKey.id]: null },
			}).run()

		}).then(function() {
			res.send()
			return next()

		}).catch(function(error) {
			return next(errors.generate(error))
		})
	}),



}





