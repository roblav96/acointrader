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



class Redis extends ioredis {

	static getOpts() {
		let opts = {
			db: 0,
			dropBufferSupport: true,
			connectionName: '[' + process.$instance + '][' + process.$dname + ']' + process.ENV,
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
	}

	pipelinecoms(coms: Redis.Coms, fixPipeline = true): Promise<any[]> {
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

	tohset(item: any): any {
		if (_.isEmpty(item)) return {}
		let toitem = {}
		Object.keys(item).forEach(function(key) {
			let value = item[key]
			if (value == null) value = null;
			if (Number.isFinite(value)) value = _.round(value, 8);
			toitem[key] = JSON.stringify(value)
		})
		return toitem
	}

	fromhget(item: any): any {
		if (_.isEmpty(item)) return {};
		Object.keys(item).forEach(function(k) {
			item[k] = JSON.parse(item[k])
		})
		return item
	}

	fromhmget(values: any[], keys: string[]): any {
		if (!Array.isArray(values) || !Array.isArray(keys)) return {};
		let item = {}
		values.forEach((v, i) => item[keys[i]] = v)
		return this.fromhget(item)
	}

}



export default new Redis()







declare global {
	namespace Redis {

		type Coms = string[][]
		type Resolved = string[][]
		interface PublishEvent<T = any> {
			name: string
			data: T
		}

	}
}



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




