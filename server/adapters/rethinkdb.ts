//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import rethinkdbdash from 'rethinkdbdash'



const r = rethinkdbdash(Object.assign({
	silent: true,
	// log: function(message) { console.log(message) },
	// discovery: true,
}, process.$webpack.rethinkdb)) as rethinkdbdash.RDash



r.expr(1).run()
process.ee3.addListener(shared.enums.EE3.TICK_5, function() { r.expr(1).run() })



// const cleanup = _.once(function() { r.getPoolMaster().drain() })
// process.on('beforeExit', cleanup)
// process.on('exit', cleanup)



export default r





/*████████████████████████████████████████
█            TABLES & INDEXES            █
████████████████████████████████████████*/

r.db('acointrader').tableCreate('users', { primaryKey: 'email', durability: 'hard' });

r.db('acointrader').tableCreate('exchanges', { primaryKey: 'hostname', durability: 'soft' });
// r.db('acointrader').table('ib_positions').indexCreate('stamp');









