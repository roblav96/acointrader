// 

import * as restify from 'restify'
import * as errors from 'restify-errors'
import * as axios from 'axios'
import * as forge from 'node-forge'



declare global {

	namespace NodeJS {
		interface Process {
			INSTANCE: number
			INSTANCES: number
			MASTER: boolean
			WORKER: boolean
			PRIMARY: boolean
			DNAME: string
			HOST: string
			PORT: number
			SALT: string
			ENVJSON: string
		}
	}

	interface Console {
		format(c: any): any
	}



	interface AxiosError extends axios.AxiosError {
		config?: axios.AxiosRequestConfig
		response?: AxiosErrorResponse
	}
	interface AxiosErrorResponse extends axios.AxiosResponse {
		data: any
	}
	type AxiosCanceler = axios.Canceler
	type IdkError = Error & AxiosError & errors.HttpError



	interface SecurityDoc {
		ip: string
		conn: string
		uuid: string
		finger: string
		email: string
		prime: string
		token: string
		publicKey: string
		privateKey: string
		authed: boolean
	}



}



