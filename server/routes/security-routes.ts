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



export default {



	'GET:token': utils.restifyRoute<any, any>(function(req, res, next) {
		Promise.resolve().then(function() {



			res.send()
			return next()

		}).catch(function(error) {
			return next(errors.generate(error))
		})
	}),



	'POST:set-email': utils.restifyRoute<{ email: string }, any>(function(req, res, next) {
		Promise.resolve().then(function() {
			utils.validBody(req.body, ['email'])

			let email = req.body.email
			if (!shared.isEmail(email)) {
				throw new errors.PreconditionFailedError('Invalid email')
			}

			return r.table('users').get(email).run().then(function(exists) {
				if (exists) throw new errors.BadRequestError(`Email "${email}" already in use.`);
				return shared.security.generatePemKeyPair(2048)

			}).then(function(keypair) {
				return r.table('users').insert({
					email,
					uuids: [req.doc.uuid],
					fingers: [req.doc.finger],
					conns: [req.doc.conn],
					ips: [req.doc.ip],
					publicPem: keypair.publicPem,
					privatePem: keypair.privatePem,
				}).run().then(function() {
					return Promise.resolve(keypair.publicPem)
				})

			}).then(function(publicPem) {
				res.send({ email, publicPem })
				return next()
			})

		}).catch(function(error) {
			return next(errors.generate(error))
		})
	}),



}



// export default utils.restifyRoute<{ email: string }, any>(function(req, res, next) {

// 	Promise.resolve().then(function() {
// 		utils.validate(req.body, ['email'])

// 		console.log('req.body.email >')
// 		eyes.inspect(req.body.email)

// 		res.send()
// 		return next()

// 	}).catch(function(error) {
// 		return next(errors.generate(error))
// 	})

// })





