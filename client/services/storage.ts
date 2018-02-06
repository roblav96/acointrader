// 

import _ from 'lodash'
import SecureLS from 'secure-ls'
import * as shared from '../../shared/shared'
import * as utils from './utils'



const sls = new SecureLS({ encodingType: 'aes' })

export function get<T = any>(key: string, def = null as T): T {
	return sls.get(key) || def
}

export function set(key: string, value: any) {
	sls.set(key, value)
}

export function remove(key: string) {
	sls.remove(key)
}

export function clear() {
	sls.clear()
}


