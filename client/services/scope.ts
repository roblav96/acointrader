// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import sha3 from 'js-sha3'
import Fingerprint2 from 'fingerprintjs2'
import * as utils from './utils'
import * as store from './store'
import * as http from './http'
import * as EmailPrompt from '../components/email-prompt/email-prompt'



export const state = {
	ready: false,
	email: process.sls.get('scope.email') as string,
}



process.sls.remove('scope.finger')
new Fingerprint2().get((result: string) => {
	process.sls.set('scope.finger', sha3.sha3_256(result))
	result = null
	state.ready = true
	http.post('/ready')
})

export function getFinger() {
	return process.sls.get('scope.finger') as string
}



export function askEmail(): Promise<boolean> {
	return EmailPrompt.prompt(state.email).then(function(email) {
		if (!email) return Promise.resolve(false);
		return http.post('/set-email', { email }).then(function(response) {
			console.log('response', response)
			process.sls.set('scope.email', email)
			state.email = email
			return Promise.resolve(true)
		})
	})
}





// export function xEmail(email?: string) {
// 	if (email) {
// 		process.sls.set('scope.email', email)
// 		state.email = email
// 	}
// 	return state.email
// }

// export function xBytes(bytes?: string) {
// 	if (bytes) process.sls.set('scope.bytes', bytes);
// 	return process.sls.get('scope.bytes') as string
// }








