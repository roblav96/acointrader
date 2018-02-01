// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'

import * as assets from './services/assets'
import * as ledger from './services/ledger'



if (process.MASTER) {
	assets.syncAssets()
	// utils.rxready.radios.filter(v => !!v).take(1).subscribe(start)
}


