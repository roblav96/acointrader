//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import * as errors from '../services/errors'
import * as shared from '../../shared/shared'
import * as utils from '../services/utils'

import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as security from '../services/security'
import * as forex from '../services/forex'



export default {



	'GET:currencies': utils.restifyRoute<any, any>(function(req, res, next) {
		Promise.resolve().then(function() {
			res.send(forex.CURRENCIES)
			return next()
		}).catch(function(error) {
			return next(errors.generate(error))
		})
	}),





}





