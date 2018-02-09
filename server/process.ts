// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'

import os from 'os'
import cluster from 'cluster'
import url from 'url'
import ee3 from 'eventemitter3'
import moment from 'moment'



const eOpts = (eyes as any).defaults as eyes.EyesOptions
eOpts.maxLength = 65536

process.$instances = os.cpus().length
process.$instance = cluster.isWorker ? Number.parseInt(cluster.worker.id as any) - 1 : -1

process.ENV = process.$webpack.env
process.DEVELOPMENT = process.ENV == 'DEVELOPMENT'
process.PRODUCTION = process.ENV == 'PRODUCTION'
process.CLIENT = false
process.SERVER = true
process.MASTER = cluster.isMaster
process.PRIMARY = process.$instance == 0
process.WORKER = cluster.isWorker

process.$domain = 'https://acointrader.com'
if (process.DEVELOPMENT) process.$domain = 'http://dev.acointrader.com';

process.$host = process.$webpack.host
process.$port = process.$webpack.port
process.$dname = 'aCoinTrader'
process.$version = '0.0.1'

process.ee3 = new ee3.EventEmitter()



require('debug-trace')()
console.format = function(args) {
	let time = moment().format('hh:mm:ss:SSS')
	let instance = '[' + process.$instance + ']'
	let stack = new Error().stack.toString()
	stack = stack.replace(/^([^\n]*?\n){2}((.|\n)*)$/gmi, '$2').split('\n')[2].trim()
	let fullpath = stack.split('/').pop()
	if (!fullpath) fullpath = args.filename + ':' + args.getLineNumber();
	let file = fullpath.split('.ts:')[0]
	let i = (fullpath.indexOf('.ts:') == -1) ? 0 : 1
	let line = fullpath.split('.ts:')[i].split(':')[0]
	let cdict = { log: 'blue', info: 'green', warn: 'yellow', error: 'red' } as Dict<string>
	let color = cdict[args.method] || 'magenta'
	let output = clc[color + 'Bright']('▉') + time + instance
	if (args.method == 'warn') {
		output = clc.yellowBright('=============================== WARN ================================\n') + output
		// file = clc.yellow(file)
	} else if (args.method == 'error') {
		output = clc.redBright('=============================== ERROR ================================\n') + output
		// file = clc.redBright(file)
	} else {
		// file = clc[color](file)
	}
	output += '[' + clc.bold(file) + ':' + line + ']'
	return '\n \n' + clc.underline(output) + '\n'
}



const errors = require('./services/errors')
process.on('uncaughtException', function(error) {
	console.error('uncaughtExceptions > error', errors.render(error))
})
process.on('unhandledRejection', function(error) {
	console.error('unhandledRejection > error', errors.render(error))
})



const MUTE = false // !process.MASTER
const benches = {} as Dict<any>
const filters = [] as string[]
process.benchStart = function(id: string) {
	if (!MUTE && filters.indexOf(id) == -1) {
		let now = Date.now()
		benches[id] = {
			start: now,
			t: now,
		}
		console.log('bench ➤ START', id)
	}
}
process.benchPing = function(id: string, name: string = '') {
	if (!MUTE && filters.indexOf(id) == -1 && benches[id]) {
		let bench = benches[id]
		let now = Date.now()
		let time = now - bench.t
		console.log('bench ➤ PING', id, name, clc.bold(time + 'ms'))
		benches[id].t = now
	}
}
process.benchEnd = function(id: string) {
	if (!MUTE && filters.indexOf(id) == -1 && benches[id]) {
		let bench = benches[id]
		let now = Date.now()
		let time = now - bench.start
		console.log('bench ➤ END', id, 'total', clc.bold.redBright(time + 'ms'))
		benches[id] = undefined
	}
}




