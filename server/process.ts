// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'

import os from 'os'
import cluster from 'cluster'
import url from 'url'
import ee3 from 'eventemitter3'



const eOpts = (eyes as any).defaults as eyes.EyesOptions
eOpts.maxLength = 65536

process.$instances = os.cpus().length
process.$instance = cluster.isWorker ? Number.parseInt(cluster.worker.id as any) - 1 : -1

process.$env = process.$webpack.env
process.DEVELOPMENT = process.$env == 'DEVELOPMENT'
process.PRODUCTION = process.$env == 'PRODUCTION'
process.CLIENT = false
process.SERVER = true

process.$domain = 'https://acointrader.com'
if (process.DEVELOPMENT) process.$domain = 'http://dev.acointrader.com';

process.$host = process.$webpack.host
process.$port = process.$webpack.port
process.$dname = 'aCoinTrader' // '𝛂CoinTrader'
process.$version = 'v1'



const errors = require('./services/errors')
process.on('uncaughtException', function(error) {
	console.error('uncaughtExceptions > error', errors.render(error as any))
})
process.on('unhandledRejection', function(error) {
	console.error('unhandledRejection > error', errors.render(error as any))
})

process.ee3 = new ee3.EventEmitter()



require('debug-trace')()
console.format = function(arg) {
	let stack = new Error().stack.toString()
	stack = stack.replace(/^([^\n]*?\n){2}((.|\n)*)$/gmi, '$2').split('\n')[2].trim()
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



if (process.DEVELOPMENT) {
	// if (cluster.isMaster) setInterval(process.stdout.write, 1000, (clc as any).erase.line);
	if (cluster.isMaster) setInterval(process.stdout.write, 1000, '');
	const dtsgen = require('dts-gen')
	const clipboardy = require('clipboardy')
	process.dtsgen = function(name, value) {
		name = name.replace(/\W+/g, '').trim()
		let results = dtsgen.generateIdentifierDeclarationFile(name, value)
		clipboardy.write(results).then(function() {
			console.info('/*████  DTS COPPIED > "' + clc.bold(name) + '"  ████*/')
		}).catch(function(error) {
			console.error('clipboardy.write > error', error)
		})
	}
}



if (cluster.isMaster) {
	let host = url.parse(process.$domain).host
	if (process.DEVELOPMENT) host = process.$host + ':' + process.$port;
	console.log('\n\n\n\n' +
		clc.bold.underline('𝛂CoinTrader') + '\n' +
		'v' + process.$version + ' ' +
		clc.bold(process.$env) + '\n' +
		clc.bold.green('@') + host + '\n' +
		'/*===============================================\n' +
		'=========           ' + clc.bold(moment().format('hh:mm:ss')) + '           ==========\n' +
		'===============================================*/\n\n' +
		clc.bold('Forking x' + clc.bold.redBright(os.cpus().length) + ' nodes in cluster...') // + '\n'
	)
}








