// 

import * as restify from 'restify'
import * as errors from 'restify-errors'
import * as axios from 'axios'
import * as ee3 from 'eventemitter3'



declare global {

	namespace NodeJS {
		interface Process {
			$instance: number
			$instances: number
			$dname: string
			$host: string
			$port: number
			$stack: string
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
		data: AxiosErrorData
	}
	type AxiosErrorData = errors.HttpError
	type AxiosCanceler = axios.Canceler

	type IdkError = Error & AxiosError & errors.HttpError



	type HttpHeaders = { [key: string]: string }
	
	// interface SecurityDoc {
	// 	uuid: string
	// 	finger: string
	// 	ip: string
	// 	conn: string
	// 	prime: string
	// 	token: string
	// }

	interface RestifyRequest<T = any> extends restify.Request {
		headers: HttpHeaders
		route: restify.Route
		body: T
		ip: string
		conn: string
		uuid: string
		finger: string
		email: string
		token: string
		authed: boolean
	}

	interface RestifyResponse<T = any> extends restify.Response {
		_body: T
		send(body?: T)
	}

	interface RestifyNext extends restify.Next {

	}



}



