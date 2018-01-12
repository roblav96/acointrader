// 

export { }
import restify = require('restify')
import errors = require('restify-errors')
import * as axios from 'axios'



declare global {

	namespace NodeJS {
		interface Process {
			$instance: number
			$instances: number
			$dname: string
			$host: string
			$port: number
			$version: string
			$redis: {
				host: string
				port: number
				password: string
			}
			$rethinkdb: {
				host: string
				port: number
				authKey: string
				db: string
			}
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

	type IdkError = Error & AxiosError & errors.HttpError

	interface AxiosCanceler extends axios.Canceler {

	}



	/*===============================
	=            RESTIFY            =
	===============================*/

	type HttpHeaders = { [key: string]: string }

	interface RestifyRequest<T = any> extends restify.Request {
		headers: HttpHeaders
		route: restify.Route
		body: T
	}

	interface RestifyResponse<T = any> extends restify.Response {
		_body: T
		send(body?: T)
	}

	interface RestifyNext extends restify.Next {

	}



}



