// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import Exchange from './exchange'
import Binance from './binance'



declare global {
	interface AllExchanges {
		binance
		upbit
	}
}



const exchanges = {
	binance: new Binance(),
}

export default exchanges

export const allexchanges = Object.keys(exchanges).map(k => exchanges[k]) as Array<Exchange>



// utils.ready.radios.filter(v => !!v).take(1).subscribe(function() {
// 	allexchanges.forEach(function(exchange) {
// 		if (utils.isMaster()) {
// 			exchange.syncAssets().then(function() {
// 				process.radio.emit(exchange.id + ':start')
// 			})
// 		} else {
// 			process.radio.once(exchange.id + ':start', function() {
// 				exchange.start()
// 			})
// 		}
// 	})
// })
















