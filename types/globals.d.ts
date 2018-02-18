// 

import * as axios from 'axios'



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
		}
	}

	interface HttpRequestConfig extends axios.AxiosRequestConfig {
		silent?: boolean
		production?: boolean
		scraper?: boolean
		retry?: boolean
	}



}












