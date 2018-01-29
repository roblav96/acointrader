// 

import uws from 'uws'
import * as axios from 'axios'
import * as ee3 from 'eventemitter3'



declare global {

	namespace NodeJS {
		interface Process {
			dtsgen: (name: string, value: any) => void
			$env: string
			DEVELOPMENT: boolean
			PRODUCTION: boolean
			CLIENT: boolean
			SERVER: boolean
			$webpack: any
			$domain: string
			$version: string
			ee3: ee3.EventEmitter
			sls: any
		}
	}
	
	interface HttpRequestConfig extends axios.AxiosRequestConfig {
		silent?: boolean
		production?: boolean
		scraper?: boolean
		retry?: boolean
	}

}












