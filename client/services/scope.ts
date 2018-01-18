// 

import _ from 'lodash'
import sha3 from 'js-sha3'
import Fingerprint2 from 'fingerprintjs2'
import * as utils from './utils'
import * as store from './store'
import * as http from './http'



export const state = {
	ready: false,
}



process.sls.remove('scope.finger')
new Fingerprint2().get((result: string) => {
	result = sha3.sha3_256(result)
	process.sls.set('scope.finger', result)
	state.ready = true
	http.post('/ready')
})

export function finger() {
	return process.sls.get('scope.finger') as string
}



export function bytes(bytes?: string) {
	if (bytes) process.sls.set('scope.bytes', bytes);
	return process.sls.get('scope.bytes') as string
}











