// 

import * as ee3 from 'eventemitter3'



declare global {

	namespace NodeJS {
		interface Process {
			dtsgen: (name: string, value: any) => void
			DEVELOPMENT: boolean
			PRODUCTION: boolean
			$webpack: any
			ee3: ee3.EventEmitter
		}
	}

}








