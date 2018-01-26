//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import ioredis from 'ioredis'



declare global {
	type RedisInstance = Redis
	type RedisComs = Array<Array<string>>
	type RedisResolved = Array<Array<string>>
	interface RedisPublishEvent<T = any> {
		name: string
		data: T
	}
}



class Redis extends ioredis {

	static getOpts() {
		let opts = {
			db: 0,
			dropBufferSupport: true,
			connectionName: '[' + process.$instance + '][' + process.$dname + ']' + process.$env,
			connectTimeout: 5000,
			lazyConnect: true,
		} as ioredis.RedisOptions

		Object.assign(opts, process.$webpack.redis)

		if (process.PRODUCTION) {
			opts.path = '/var/run/redis_' + opts.port + '.sock'
			_.unset(opts, 'host')
			_.unset(opts, 'port')
		}

		return opts
	}



	constructor() {
		super(Redis.getOpts())

		// this.ping()
		// _.delay(() => this.ping(), 1000)
		process.ee3.addListener(shared.enums.EE3.TICK_5, () => this.ping())

		const cleanup = _.once(() => this.disconnect())
		process.on('beforeExit', cleanup)
		process.on('exit', cleanup)

	}



	// ping() {
	// 	console.log('ping')
	// 	super.ping().then(function(pong) {
	// 		console.log('pong >')
	// 		eyes.inspect(pong)
	// 	})
	// }



	pipelinecoms(coms: RedisComs, fixPipeline = true): Promise<Array<any>> {
		return super.pipeline(coms).exec().then(function(resolved) {
			if (fixPipeline == true && Array.isArray(resolved)) {
				let i: number, len = resolved.length
				for (i = 0; i < len; i++) {
					let result = resolved[i]
					let error = result[0]
					if (error != null) {
						console.error(clc.red.bold('>>>> REDIS PIPELINE ERROR <<<<'))
						throw new Error(error)
					}
					resolved[i] = result[1]
				}
			}
			return Promise.resolve(resolved)
		})
	}



}



export default new Redis()




