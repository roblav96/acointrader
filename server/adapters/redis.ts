//

import * as eyes from 'eyes'
import * as clc from 'cli-color'
import * as _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import * as ioredis from 'ioredis'
import * as pforever from 'p-forever'
import * as pevent from 'p-event'



class Redis extends ioredis {

	static getOpts() {
		let opts = {
			db: 0,
			dropBufferSupport: true,
			connectionName: '[' + process.INSTANCE + '][' + process.DNAME + ']' + process.ENV,
		} as ioredis.RedisOptions

		Object.assign(opts, require(process.ENVJSON)[process.ENV]['redis'])

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







