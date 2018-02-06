// 

import _ from 'lodash'
import forge from 'node-forge'
import pdelay from 'delay'
import Fingerprint2 from 'fingerprintjs2'
import * as shared from '../../shared/shared'
import * as utils from './utils'
import * as storage from './storage'
import * as store from './store'
import * as http from './http'



export const state = {
	email: storage.get('security.email', ''),
	phone: storage.get('security.phone', ''),
}



function initUuid() {
	let uuid = storage.get('security.uuid') as string
	if (uuid) return Promise.resolve();
	return shared.security.generatePrime(64).then(function(prime) {
		storage.set('security.uuid', prime)
		return Promise.resolve()
	})
}

function initFinger() {
	let finger = storage.get('security.finger') as string
	if (finger) return Promise.resolve();
	return new Promise<void>(function(resolve) {
		new Fingerprint2().get(function(finger) {
			storage.set('security.finger', shared.security.sha256(finger))
			resolve()
		})
	})
}

function initPemKeys() {
	let publicPem = storage.get('security.publicPem') as string
	if (publicPem) return Promise.resolve();
	return shared.security.generatePemKeyPair(2048).then(function(keypair) {
		console.log('keypair', keypair)
		storage.set('security.publicPem', keypair.publicPem)
		storage.set('security.privatePem', keypair.privatePem)
		return Promise.resolve()
	})
}



function initToken(): Promise<void> {
	return http.get('/security/token').then(function(response) {
		console.log('syncToken > response', response)
		return Promise.resolve()
	}).catch(function(error) {
		console.error('syncToken > error', error)
		return pdelay(process.DEVELOPMENT ? 3000 : 1000).then(initToken)
	})
}

export function init() {
	return Promise.resolve().then(function() {
		return Promise.all([
			initUuid(), initFinger(), initPemKeys(),
		])
	}).then(function() {
		return initToken()
	})
}



export function getHeaders(): HttpHeaders {
	let headers = {
		'x-uuid': storage.get('security.uuid'),
		'x-finger': storage.get('security.finger'),
		'x-email': storage.get('security.email') || undefined,
	} as HttpHeaders
	return headers
}



// export function saveEmail(response) {
// 	storage.set('security.email', response.email)
// 	state.email = response.email
// 	storage.set('security.publicPem', response.publicPem)
// }

// export function askEmail(): Promise<boolean> {
// 	return EmailPrompt.prompt(state.email).then(function(email) {
// 		if (!email) return Promise.resolve(false);
// 		return http.post('/security/set-email', { email }).then(function(response) {
// 			console.log('response', response)
// 			// storage.set('security.email', email)
// 			// state.email = email
// 			return Promise.resolve(true)
// 		})
// 	})
// }





// export function showAuth() {
// 	return AuthPrompt.prompt(state.email).then(function(email) {
// 		if (!email) return Promise.resolve(false);
// 		return http.post('/set-email', { email }).then(function(response) {
// 			console.log('response', response)
// 			storage.set('security.email', email)
// 			state.email = email
// 			return Promise.resolve(true)
// 		})
// 	})
// }






