// 

import * as axios from 'axios'
import * as ee3 from 'eventemitter3'



declare global {

	namespace NodeJS {
		interface Process {
			dtsgen: (name: string, value: any) => void
			clipboard: (name: string, input: string) => void
			benchStart: (id: string) => void
			benchPing: (id: string, name: string) => void
			benchEnd: (id: string) => void
			ENV: string
			DEVELOPMENT: boolean
			PRODUCTION: boolean
			CLIENT: boolean
			SERVER: boolean
			MASTER: boolean
			PRIMARY: boolean
			WORKER: boolean
			$webpack: any
			$domain: string
			$version: string
			ee3: ee3.EventEmitter
		}
	}

	interface HttpRequestConfig extends axios.AxiosRequestConfig {
		silent?: boolean
		production?: boolean
		scraper?: boolean
		retry?: boolean
	}

}












