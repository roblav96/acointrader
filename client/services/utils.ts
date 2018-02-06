// 

import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import moment from 'moment'
import forge from 'node-forge'
import * as shared from '../../shared/shared'



if (process.DEVELOPMENT) {
	{ Object.keys(shared).forEach(k => window[k] = shared[k]) }
	{ (window as any).forge = forge }
}











