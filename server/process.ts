// 

import 'source-map-support/register'
import os from 'os'
import cluster from 'cluster'
import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'

const eOpts = (eyes as any).defaults as eyes.EyesOptions
eOpts.maxLength = 65536



process.$instances = os.cpus().length
process.$instance = cluster.isWorker ? Number.parseInt(cluster.worker.id as any) - 1 : -1

process.$env = process.$webpack.env
process.DEVELOPMENT = process.$env == 'DEVELOPMENT'
process.PRODUCTION = process.$env == 'PRODUCTION'

process.$host = process.$webpack.host
process.$port = process.$webpack.port
process.$dname = 'aCoinTrader'
process.$version = '0.0.1'

process.env.NODE_HEAPDUMP_OPTIONS = 'nosignal'



process.$stack = null

process.on('uncaughtException', function(error) {
	console.error(clc.bold.redBright('/*==========  UNCAUGHT EXCEPTION  ==========*/'))
	console.error('uncaughtExceptions > error', error)
})

process.on('unhandledRejection', function(error) {
	console.error(clc.bold.redBright('/*==========  UNHANDLED REJECTION  ==========*/'))
	console.error('unhandledRejection > error', error)
})



if (process.DEVELOPMENT) {
	const dtsgen = require('dts-gen')
	const clipboardy = require('clipboardy')
	process.dtsgen = function(name, value) {
		let results = dtsgen.generateIdentifierDeclarationFile(name, value)
		clipboardy.write(results).then(function() {
			console.info('coppied >', name)
		}).catch(function(error) {
			console.error('clipboardy.write > error', error)
		})
	}
}



require('debug-trace')()
console.format = function(arg) {
	let stack = process.$stack
	if (!stack) {
		stack = new Error().stack.toString()
		stack = stack.replace(/^([^\n]*?\n){2}((.|\n)*)$/gmi, '$2').split('\n')[2].trim()
	}
	let fullpath = stack.split('/').pop()
	if (!fullpath) fullpath = arg.filename + ':' + arg.getLineNumber();
	let file = fullpath.split('.ts:')[0]
	let i = (fullpath.indexOf('.ts:') == -1) ? 0 : 1
	let line = fullpath.split('.ts:')[i].split(':')[0]
	let header = '[' + process.$instance + ']' + '[' + clc.bold(file.toUpperCase()) + ':' + line + ']'
	let format = 'hh:mm:ss:SSS'
	let time = moment().format(format)
	let cString: string
	if (arg.method == 'log') {
		cString = clc.blue(time) + header
	} else if (arg.method == 'info') {
		cString = clc.green(time) + header
	} else if (arg.method == 'warn') {
		cString = clc.yellowBright('=============================== WARN ================================\n') + clc.yellow(time) + header
	} else if (arg.method == 'error') {
		cString = clc.redBright('=============================== ERROR ================================\n') + clc.red(time) + header
	}
	return '\n \n' + clc.underline(cString) + '\n'
}








