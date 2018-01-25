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
import forge from 'node-forge'



export function use(req: RestifyRequest) {

	console.log('req.headers >')
	eyes.inspect(req.headers)

	req.authed = false
	req.ip = requestip.getClientIp(req)
	req.conn = buildConn(req.headers)

	req.uuid = req.headers['x-uuid']
	console.log('req.uuid.length', req.uuid.length)
	utils.validHeader('uuid', req.uuid, 44)

	req.finger = shared.parseId(req.headers['x-finger'])
	utils.validHeader('finger', req.finger, 32)

	if (req.headers['x-email']) {
		req.email = req.headers['x-email']
		if (!shared.isValidEmail(req.email)) throw new errors.PreconditionFailedError('Invalid x-email');
	}

}



export function buildConn(headers: HttpHeaders) {
	let conn = headers['x-real-ip'] + headers['x-forwarded-for'] + headers['host'] + headers['hostname']
	return shared.security.sha256(conn)
}









