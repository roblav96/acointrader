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
import forge from 'node-forge'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'



export function use(req: RestifyRequest): Promise<void> {
	return Promise.resolve().then(function() {

		// console.log('req.headers >')
		// eyes.inspect(req.headers)

		req.doc = {
			authed: false,
			ip: requestip.getClientIp(req),
			conn: buildConn(req.headers),
			uuid: shared.string.toId(req.headers['x-uuid']),
			finger: shared.string.toId(req.headers['x-finger']),
			email: req.headers['x-email'],
		} as SecurityDoc

		if (!req.doc.uuid || req.doc.uuid.length != 64) throw new errors.PreconditionFailedError('Invalid x-uuid');
		if (!req.doc.finger || req.doc.finger.length != 64) throw new errors.PreconditionFailedError('Invalid x-finger');
		if (req.doc.email && !shared.isEmail(req.doc.email)) throw new errors.PreconditionFailedError('Invalid x-email');

		// console.log('req.doc >')
		// eyes.inspect(req.doc)

		return redis.hgetall('security:' + req.doc.uuid)

		// }).then(function(doc: SecurityDoc) {
		// 	if (doc.privateKey) return Promise.resolve(doc);
		// 	return shared.security.generateKeyPair(1024).then(function(keypair) {
		// 		doc.publicKey
		// 		return Promise.resolve(doc)
		// 	})

	}).then(function(doc: SecurityDoc) {
		// console.log('doc >')
		// eyes.inspect(doc)

		return Promise.resolve()

	})

}



export function buildConn(headers: HttpHeaders): string {
	let conn = headers['x-real-ip'] + headers['x-forwarded-for'] + headers['host'] + headers['hostname']
	return shared.security.sha256(conn)
}









