// 



import 'source-map-support/register'
import os from 'os'
import cluster from 'cluster'



process.$instances = os.cpus().length
process.$instance = cluster.isWorker ? Number.parseInt(cluster.worker.id as any) - 1 : -1



process.on('uncaughtException', function(error) {
	console.error('uncaughtExceptions > error', error)
})

process.on('unhandledRejection', function(error) {
	console.error('unhandledRejection > error', error)
})



import cron from 'cron'
import ci from 'correcting-interval'
import ee3 from 'eventemitter3'

process.ee3 = new ee3.EventEmitter()



import eyes from 'eyes'
const eOpts = (eyes as any).defaults as eyes.EyesOptions
eOpts.maxLength = 65536
import clc from 'cli-color'
import _ from 'lodash'
import restify from 'restify'
import moment from 'moment'
import fs from 'fs'
import path from 'path'
import rx from 'rxjs/Rx'
import uws from 'uws'



require('debug-trace')()
console.format = function(c) {
	let stack = process.$stack
	if (!stack) {
		stack = new Error().stack.toString()
		stack = stack.replace(/^([^\n]*?\n){2}((.|\n)*)$/gmi, '$2').split('\n')[2].trim()
	}
	let fullpath = stack.split('/').pop()
	if (!fullpath) fullpath = c.filename + ':' + c.getLineNumber();
	let file = fullpath.split('.ts:')[0]
	let i = (fullpath.indexOf('.ts:') == -1) ? 0 : 1
	let line = fullpath.split('.ts:')[i].split(':')[0]
	let header = '[' + process.$instance + ']' + '[' + clc.bold(file.toUpperCase()) + ':' + line + ']'
	let format = 'hh:mm:ss:SSS'
	let time = moment().format(format)
	let cString: string
	if (c.method == 'log') {
		cString = clc.blue(time) + header
	} else if (c.method == 'info') {
		cString = clc.green(time) + header
	} else if (c.method == 'warn') {
		cString = clc.yellowBright('=============================== WARN ================================\n') + clc.yellow(time) + header
	} else if (c.method == 'error') {
		cString = clc.redBright('=============================== ERROR ================================\n') + clc.red(time) + header
	}
	return '\n \n' + clc.underline(cString) + '\n'
}



import * as errors from './services/errors'
import * as utils from './services/utils'



/*███████████████████████████████
█            RESTIFY            █
███████████████████████████████*/

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











