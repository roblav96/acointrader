//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import * as errors from '../services/errors'
import * as utils from '../services/utils'

import { parse as parseUrl } from 'url'
import axios from 'axios'



export default utils.restifyRoute<any, any>(function(req, res, next) {

	Promise.resolve().then(function() {
		utils.validBody(req.body, ['method', 'url'])

		let parsed = parseUrl(req.body.url)
		if (!_.isString(parsed.host)) throw new errors.PreconditionFailedError('Invalid url');

		let host = parsed.host.split('.').splice(-2).join('.')
		let validhosts = [
			// '',
		]
		if (validhosts.indexOf(host) == -1) {
			throw new errors.PreconditionFailedError('Invalid url')
		}

		return axios.request(req.body).then(function({ data }) {
			res.send(data)
			return next()
		})

	}).catch(function(error) {
		return next(errors.generate(error))
	})

})





