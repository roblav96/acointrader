// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import './binance'
// import * as binance from './binance'



declare global {
	
	interface ExchangeItem {
		id: string
		name: string
		website: string
		logoSquare: string
		logoWide: string
		logoBanner: string
		description: string
	}
	
}













