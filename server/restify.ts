// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import moment from 'moment'
import * as errors from './services/errors'
import * as utils from './services/utils'



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







server.listen(process.$port, process.$host, function() {
	console.log('listening...')
})







