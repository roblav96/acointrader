//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as shared from '../../shared/shared'
import * as utils from '../services/utils'

import ee3 from 'eventemitter3'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import UWebSocket from '../adapters/uwebsocket'
import * as http from '../services/http'



export default class Exchange {

	readonly id: string
	
	constructor() {
		
	}

	start?(): void

	syncAssets?(): Promise<boolean>



}










