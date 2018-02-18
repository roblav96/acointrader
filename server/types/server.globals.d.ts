// 

import * as restify from 'restify'
import * as errors from 'restify-errors'
import * as axios from 'axios'
import * as forge from 'node-forge'
import * as ee3 from 'eventemitter3'



declare global {

	namespace NodeJS {
		interface Process {
			MASTER: boolean
			WORKER: boolean
			PRIMARY: boolean
			INSTANCE: number
			INSTANCES: number
			DNAME: string
			HOST: string
			PORT: number
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
		data: any // AxiosErrorData
	}
	// type AxiosErrorData = errors.HttpError
	// type AxiosCanceler = axios.Canceler

	// type IdkError = Error & AxiosError & errors.HttpError



	type HttpHeaders = { [key: string]: string }

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

	interface RestifyRequest<T = any> extends restify.Request {
		headers: HttpHeaders
		route: restify.Route
		body: T
		doc: SecurityDoc
	}

	interface RestifyResponse<T = any> extends restify.Response {
		_body: T
		send(body?: T)
	}

	interface RestifyNext extends restify.Next {

	}



}



