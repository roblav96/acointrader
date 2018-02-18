// 

import * as axios from 'axios'
import * as ee3 from 'eventemitter3'



declare global {

	namespace NodeJS {
		interface Process {
			dtsgen: (desc: string, value: any) => void
			clipboard: (desc: string, input: string) => void
			ENV: 'DEVELOPMENT' | 'PRODUCTION'
			DEVELOPMENT: boolean
			PRODUCTION: boolean
			CLIENT: boolean
			SERVER: boolean
			DOMAIN: string
			VERSION: string
			EE3: ee3
		}
	}

	type HttpHeaders = { [key: string]: string }
	interface HttpRequestConfig extends axios.AxiosRequestConfig {
		silent?: boolean
		production?: boolean
		scraper?: boolean
		retry?: boolean
	}



}












