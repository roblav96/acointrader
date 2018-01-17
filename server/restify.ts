// 

import os from 'os'
import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import restify from 'restify'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'



const server = restify.createServer()

server.opts(/.*/, utils.restifyRoute(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'))
	res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'))
	res.send(200)
	return next()
}))

server.use(utils.restifyRoute(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'))
	res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'))
	return next()
}))

server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())

import api_proxy from './routes/proxy'
server.post('/api/proxy', api_proxy)





if (utils.isMaster()) {
	console.log(clc.bold('Forking x' + clc.bold.redBright(os.cpus().length) + ' clusters...'))
} else {
	server.listen(process.$port, process.$host, function() {
		if (utils.isPrimary()) {
			let host = 'robinstocks.com'
			if (process.DEVELOPMENT) host = process.$host + ':' + process.$port;
			console.log('\n' +
				clc.bold.underline(process.$dname) + '\n' +
				'v' + process.$version + '\n' +
				clc.bold(process.$env) + '\n' +
				clc.bold.green('@') + host + '\n' +
				'/*===============================================\n' +
				'=========           ' + clc.bold(moment().format('hh:mm:ss')) + '           ==========\n' +
				'===============================================*/'
			)
		}
	})
}







