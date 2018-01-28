// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import * as binance from './binance'



declare global {
	
	interface ExchangeItem {
		id: string
		name: string
		website: string
		hostname: string
		logoSquare: string
		logoWide: string
		logoBanner: string
		inaugurated: number
		description: string
		mobileapp: boolean
		fees: number
		usability: number
		coinclarity: string
	}
	
}



if (utils.isMaster()) {
	binance.start()
}













