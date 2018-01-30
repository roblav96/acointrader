//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import ioredis from 'ioredis'
import pforever from 'p-forever'
import pevent from 'p-event'



declare global {
	namespace Redis {
		type Instance = Redis
		type Coms = Array<Array<string>>
		type Resolved = Array<Array<string>>
		interface PublishEvent<T = any> {
			name: string
			data: T
		}
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
		// process.ee3.addListener(shared.enums.EE3.TICK_5, () => this.ping())

		// const cleanup = _.once(() => this.disconnect())
		// process.on('beforeExit', cleanup)
		// process.on('exit', cleanup)

	}



	pipelinecoms(coms: Redis.Coms, fixPipeline = true): Promise<Array<any>> {
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



// const redis = new Redis()



// function ping() {
// 	return Promise.resolve().then(function() {
// 		return redis.ping()
// 	}).then(function() {
// 		utils.ready.redis.next(true)
// 		return Promise.resolve()
// 	}).catch(function(error) {
// 		console.error('ping > error', error)
// 		return Promise.resolve()
// 	}).then(function() {
// 		return pevent(process.ee3, shared.enums.EE3.TICK_10)
// 	})
// }
// pforever(ping)



// export default redis




