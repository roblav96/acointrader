// 

import uws from 'uws'
import * as ee3 from 'eventemitter3'



declare global {

	namespace NodeJS {
		interface Process {
			dtsgen: (name: string, value: any) => void
			$env: string
			DEVELOPMENT: boolean
			PRODUCTION: boolean
			$webpack: any
			ee3: ee3.EventEmitter
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

}








