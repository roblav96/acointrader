// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import pevent from 'p-event'
import pforever from 'p-forever'
import * as sequence from 'sequence-sdk'
import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from './http'



export const client = new sequence.Client(process.$webpack.sequence)
console.log('shared.object.destroy')
// shared.object.destroy(process.$webpack.sequence)
// process.$webpack.sequence.ledger = 'null'
console.log('process.$webpack >')
eyes.inspect(process.$webpack)









