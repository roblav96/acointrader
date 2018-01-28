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
		hostname: string
		name: string
		logoSquareSD: string
		logoSquareHD: string
		logoSquare4K: string
		logoWideSD: string
		logoWideHD: string
		logoWide4K: string
	}
	
}













