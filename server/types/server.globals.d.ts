// 

import * as axios from 'axios'



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



}



