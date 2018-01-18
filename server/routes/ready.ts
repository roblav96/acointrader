//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import * as errors from '../services/errors'
import * as utils from '../services/utils'



export default utils.restifyRoute<any, any>(function(req, res, next) {

	Promise.resolve().then(function() {
		// utils.validate(req.body, ['method', 'url'])

		res.send()
		return next()

	}).catch(function(error) {
		return next(errors.generate(error))
	})

})




