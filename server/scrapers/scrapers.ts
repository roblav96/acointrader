// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import * as cryptominded from './cryptominded.com'
import * as coinclarity from './coinclarity.com'



if (utils.isMaster()) {
	// cryptominded.exchanges.sync()
	coinclarity.exchanges.sync()
}












