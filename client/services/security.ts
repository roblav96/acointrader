// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import sha3 from 'js-sha3'
import Fingerprint2 from 'fingerprintjs2'
import pdelay from 'delay'
import * as utils from './utils'
import * as store from './store'
import * as http from './http'
import * as EmailPrompt from '../components/email-prompt/email-prompt'
import * as AuthPrompt from '../components/auth-prompt/auth-prompt'



export const state = {
	email: process.sls.get('security.email') as string,
}



export function getHeaders(): HttpHeaders {
	return {
		'x-finger': process.sls.get('security.finger'),
		'x-email': process.sls.get('security.email'),
	}
}



function initFinger() {
	let finger = process.sls.get('security.finger') as string
	if (finger) return Promise.resolve(finger);
	return new Promise<string>(function(resolve) {
		new Fingerprint2().get(finger => {
			process.sls.set('security.finger', finger)
			resolve(finger)
		})
	})
}

function isReady() {
	return http.post('/ready').then(response => {
		console.log('isReady > response', response)
		return Promise.resolve()
	}).catch(function(error) {
		console.error('isReady > error', error)
		return pdelay(1000).then(isReady)
	})
}

export function getReady() {
	return Promise.resolve().then(initFinger).then(isReady).then(function() {
		return Promise.resolve()
	})
}





export function askEmail(): Promise<boolean> {
	return EmailPrompt.prompt(state.email).then(function(email) {
		if (!email) return Promise.resolve(false);
		return http.post('/set-email', { email }).then(function(response) {
			console.log('response', response)
			// process.sls.set('security.email', email)
			// state.email = email
			return Promise.resolve(true)
		})
	})
}





// export function showAuth() {
// 	return AuthPrompt.prompt(state.email).then(function(email) {
// 		if (!email) return Promise.resolve(false);
// 		return http.post('/set-email', { email }).then(function(response) {
// 			console.log('response', response)
// 			process.sls.set('security.email', email)
// 			state.email = email
// 			return Promise.resolve(true)
// 		})
// 	})
// }








