//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import rethinkdbdash from 'rethinkdbdash'
import pforever from 'p-forever'
import pevent from 'p-event'



const r = rethinkdbdash(Object.assign({
	silent: true,
	// discovery: true,
	// pingInterval: 1000,
	// log: function(message) { console.log(message) },
	// discovery: true,
}, process.$webpack.rethinkdb)) as rethinkdbdash.RDash



// function ping() {
// 	let t = Date.now()
// 	return Promise.resolve().then(function() {
// 		return r.expr(1).run()
// 	}).then(function() {
// 		if (!utils.ready.r.value) {
// 			console.log('ping', Date.now() - t, 'ms')
// 			utils.ready.r.next(true)
// 		}
// 		return Promise.resolve()
// 	}).catch(function(error) {
// 		console.error('ping > error', error)
// 		return Promise.resolve()
// 	}).then(function() {
// 		return pevent(process.ee3, shared.enums.EE3.TICK_10)
// 	})
// }
// pforever(ping)



// const cleanup = _.once(function() { r.getPoolMaster().drain() })
// process.on('beforeExit', cleanup)
// process.on('exit', cleanup)



export default r





function _init() {

	/*████████████████████████████████████████
	█            TABLES & INDEXES            █
	████████████████████████████████████████*/

	r.db('acointrader').tableCreate('users', { primaryKey: 'email', durability: 'hard' });

	r.db('acointrader').tableCreate('exchanges', { primaryKey: 'id', durability: 'soft' });

	r.db('acointrader').tableCreate('assets', { primaryKey: 'id', durability: 'soft' });

	// r.db('acointrader').tableCreate('pairs', { primaryKey: 'id', durability: 'soft' });



}








