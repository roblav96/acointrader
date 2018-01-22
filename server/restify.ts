// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'

import os from 'os'
import cluster from 'cluster'
import restify from 'restify'
import { parse as parseUrl } from 'url'
import redis from './adapters/redis'
import r from './adapters/rethinkdb'
import * as security from './services/security'



const server = restify.createServer()



// server.opts(/.*/, utils.restifyRoute(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*')
// 	res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'))
// 	res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'))
// 	res.send(200)
// 	return next()
// }))

// server.use(utils.restifyRoute(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*')
// 	res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'))
// 	res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'))
// 	return next()
// }))

server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())





import api_proxy from './routes/proxy'
server.post('/api/proxy', api_proxy)





server.use(utils.restifyRoute(function(req, res, next) {

	Promise.resolve().then(function() {
		if (!req.route) throw new errors.NotFoundError('Undefined request route');

		security.reqBuild(req)



		return next()

	}).catch(function(error) {
		return next(errors.generate(error))
	})

}))





import security_routes from './routes/security-routes'
utils.restifyBulkRoutes(server, 'security', security_routes)





server.on('uncaughtException', function(req: RestifyRequest, res: RestifyResponse, route: restify.Route, error: any) {
	console.error('restify uncaughtException', errors.render(error))
	res.send(new errors.InternalServerError(error.message))
})

server.on('after', function(req: RestifyRequest, res: RestifyResponse, route: restify.Route, error: any) {

	if (res && res.statusCode == 302) return;

	if (error) {
		let name = _.get(req, 'route.name') as string
		console.error('restify after > ' + req.method + ' ' + name + ' >', errors.render(error))
	}

	if (req.route) {
		if (process.DEVELOPMENT && !req.query.silent && req.method != 'OPTIONS') {
			let body = res._body
			try {
				body = JSON.stringify(body)
				body = body.substring(0, 128) + '...'
			} catch (e) { }
			let color: string = (error) ? 'red' : 'bold'
			console.info(clc[color]('◀ ' + req.method + ' ' + req.route.path + ' ◀ ') + body)
		}
	}

})





if (utils.isMaster()) {

	console.log(clc.bold('Forking x' + clc.bold.redBright(os.cpus().length) + ' clusters...'))
	let i: number, len = process.$instances
	for (i = 0; i < len; i++) { cluster.fork() }
	cluster.on('disconnect', function(worker) {
		console.warn('cluster disconnect >', worker.id)
		process.radio.emit(shared.ENUMS.RESTART)
	})
	cluster.on('exit', function(worker, code, signal) {
		console.error('cluster exit >', worker.id, code, signal)
		process.radio.emit(shared.ENUMS.RESTART)
	})

} else {

	server.listen(process.$port, process.$host, function() {
		if (utils.isPrimary()) {
			let host = parseUrl(process.$domain).host
			if (process.DEVELOPMENT) host = process.$host + ':' + process.$port;
			console.log('\n' +
				clc.bold.underline(process.$dname) + '\n' +
				'v' + process.$version + ' ' +
				clc.bold(process.$env) + '\n' +
				clc.bold.green('@') + host + '\n' +
				'/*===============================================\n' +
				'=========           ' + clc.bold(moment().format('hh:mm:ss')) + '           ==========\n' +
				'===============================================*/'
			)
		}
	})

}







