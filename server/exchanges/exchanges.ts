// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import * as binance from './binance'
import * as upbit from './upbit'



declare global {
	interface AllExchanges {
		binance
		upbit
	}
}



if (utils.isMaster()) {
	// binance.start()
	// binance.syncInfo()
	// upbit.syncAssets()
}













