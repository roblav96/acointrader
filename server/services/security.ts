// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import { parse as parseUrl } from 'url'
import requestip from 'request-ip'
import sha3 from 'js-sha3'



export function reqIp(req: RestifyRequest) {
	return requestip.getClientIp(req)
}

export function reqConn(headers: HttpHeaders) {
	return sha3.sha3_256(headers['x-real-ip'] + headers['x-forwarded-for'] + headers['host'] + headers['hostname'])
}



export function reqBuild(req: RestifyRequest) {
	console.log('req.headers >')
	eyes.inspect(req.headers)

	if (req.headers['host'] != parseUrl(process.$domain).host) {
		throw new errors.PreconditionFailedError('Invalid host')
	}

	req.authed = false
	req.ip = reqIp(req)
	req.conn = reqConn(req.headers)

	req.uuid = shared.parseId(req.headers['x-uuid'])
	utils.validHeader('uuid', req.uuid, 32)

	req.finger = shared.parseId(req.headers['x-finger'])
	utils.validHeader('finger', req.finger, 32)

	if (req.headers['x-email']) {
		req.email = req.headers['x-email']
		if (!shared.isValidEmail(req.email)) throw new errors.PreconditionFailedError('Invalid x-email');
	}
}







