//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import * as errors from '../services/errors'
import * as shared from '../../shared/shared'
import * as utils from '../services/utils'



export default {



	'POST:set-email':
		utils.restifyRoute<{ email: string }, any>(function(req, res, next) {
			Promise.resolve().then(function() {
				utils.validate(req.body, ['email'])
				
				let email = req.body.email
				
				if (shared.isValidEmail(email)) {
					throw new errors.PreconditionFailedError('Invalid email')
				}

				console.log('req.body.email >')
				eyes.inspect(req.body.email)

				res.send()
				return next()

			}).catch(function(error) {
				return next(errors.generate(error))
			})
		})
	,



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





