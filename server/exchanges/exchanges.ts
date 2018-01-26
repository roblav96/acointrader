// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import fs from 'fs'



if (utils.isMaster()) {
	console.log('process.cwd()s', process.cwd())
	console.log('__dirname', __dirname)
	console.log('__filename', __filename)
	fs.readdirSync(__dirname).forEach(function(file) {
		console.log('file', file)
	})
}
















