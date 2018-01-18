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
			$webpack: any
			$domain: string
			$version: string
			ee3: ee3.EventEmitter
			sls: any
		}
	}
	
	interface Socket extends uws {
		events: Array<string>
	}
	
	interface SocketMessage {
		action?: string
		event?: string
		data?: any
	}
	
	interface HttpRequestConfig extends axios.AxiosRequestConfig {
		silent?: boolean
		rhtoken?: string
		rhqsdata?: boolean
		wbtoken?: boolean
		production?: boolean
	}

}



// declare module 'node-forge' {
// 	var md: any
// 	var hmac: any
// 	var random: any
// 	var prime: any
// 	namespace pki {
// 		function privateKeyFromPem(pem: PEM): Key
// 	}
// }








