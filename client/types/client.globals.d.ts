// 

import * as ee3 from 'eventemitter3'



declare global {

	namespace NodeJS {
		interface Process {
			ee3: ee3.EventEmitter
		}
		interface Global {
			Chartist: any
		}
	}

	interface Window {

	}

}








