// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import forge from 'node-forge'
{ (window as any).forge = forge }
import Fingerprint2 from 'fingerprintjs2'
import pdelay from 'delay'
import axios from 'axios'
import * as shared from '../../shared/shared'
import * as utils from './utils'
import * as store from './store'
import * as http from './http'



export const state = {
	email: process.sls.get('security.email') as string,
}



function initUuid() {
	let uuid = process.sls.get('security.uuid') as string
	if (uuid) return Promise.resolve();
	return shared.security.generatePrime(64).then(function(prime) {
		process.sls.set('security.uuid', prime)
		return Promise.resolve()
	})
}

function initFinger() {
	let finger = process.sls.get('security.finger') as string
	if (finger) return Promise.resolve();
	return new Promise<void>(function(resolve) {
		new Fingerprint2().get(finger => {
			process.sls.set('security.finger', shared.security.sha256(finger))
			resolve()
		})
	})
}

function initPemKeys() {
	let publicPem = process.sls.get('security.publicPem') as string
	if (publicPem) return Promise.resolve();
	return shared.security.generatePemKeyPair(1024).then(function(keypair) {
		process.sls.set('security.publicPem', keypair.publicPem)
		process.sls.set('security.privatePem', keypair.privatePem)
		return Promise.resolve()
	})
}



function syncToken() {
	return http.get('/security/token').then(response => {
		console.log('syncToken > response', response)
		return Promise.resolve()
	}).catch(function(error) {
		console.error('syncToken > error', error)
		return pdelay(process.DEVELOPMENT ? 3000 : 1000).then(syncToken)
	})
}

export function getReady() {
	return Promise.resolve().then(function() {
		return Promise.all([
			initUuid(), initFinger(), initPemKeys(),
		])
	}).then(syncToken).then(function() {
		return Promise.resolve()
	})
}



export function getHeaders(): HttpHeaders {
	let headers = {
		'x-uuid': process.sls.get('security.uuid'),
		'x-finger': process.sls.get('security.finger'),
		'x-email': process.sls.get('security.email') || undefined,
	} as HttpHeaders
	return headers
}



export function saveEmail(response) {
	process.sls.set('security.email', response.email)
	state.email = response.email
	process.sls.set('security.publicPem', response.publicPem)
}

// export function askEmail(): Promise<boolean> {
// 	return EmailPrompt.prompt(state.email).then(function(email) {
// 		if (!email) return Promise.resolve(false);
// 		return http.post('/security/set-email', { email }).then(function(response) {
// 			console.log('response', response)
// 			// process.sls.set('security.email', email)
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
// 			process.sls.set('security.email', email)
// 			state.email = email
// 			return Promise.resolve(true)
// 		})
// 	})
// }






