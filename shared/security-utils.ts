// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'

import forge from 'node-forge'



export const security = {

	sha256(value: string): string {
		let md = (forge.md as any).sha512.sha256.create()
		md.update(value)
		return md.digest().toHex()
	},

	randomHex(size: number): string {
		return forge.util.bytesToHex(forge.random.getBytesSync(Math.round(size * 0.5)))
	},

	generatePrime(size: number): Promise<string> {
		return new Promise(function(resolve, reject) {
			forge.prime.generateProbablePrime((size * 4), function(error, result) {
				if (error) return reject(error);
				resolve(result.toString(16))
			})
		})
	},

	generatePemKeyPair(size: number): Promise<Security.PemKeyPair> {
		return new Promise(function(resolve, reject) {
			forge.pki.rsa.generateKeyPair({ bits: size, workers: -1 }, function(error, keypair) {
				if (error) return reject(error);
				resolve(keypair)
			})
		}).then(function(keypair: forge.pki.KeyPair) {
			return Promise.resolve({
				publicPem: forge.pki.publicKeyToPem(keypair.publicKey),
				privatePem: forge.pki.privateKeyToPem(keypair.privateKey),
			} as Security.PemKeyPair)
		})
	},

	encrypt<T>(decrypted: T, publicPem: string): T {
		let publicKey = forge.pki.publicKeyFromPem(publicPem)
		let encrypted = {} as T
		Object.keys(decrypted).forEach(function(key) {
			let value = decrypted[key]
			if (value == null) return;
			encrypted[key] = publicKey.encrypt(value)
		})
		return encrypted
	},

	decrypt<T>(encrypted: T, privatePem: string): T {
		let privateKey = forge.pki.privateKeyFromPem(privatePem)
		let decrypted = {} as T
		Object.keys(encrypted).forEach(function(key) {
			let value = encrypted[key]
			if (value == null) return;
			decrypted[key] = privateKey.decrypt(value)
		})
		return decrypted
	},

}







declare global {
	namespace Security {

		interface PemKeyPair {
			publicPem: string
			privatePem: string
		}

	}
}




