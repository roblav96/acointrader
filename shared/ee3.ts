// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import ee3 from 'eventemitter3'
import ci from 'correcting-interval'



export const EE3 = {
	TICK_01: 'tick:01',
	TICK_025: 'tick:025',
	TICK_05: 'tick:05',
	TICK_1: 'tick:1',
	TICK_2: 'tick:2',
	TICK_3: 'tick:3',
	TICK_5: 'tick:5',
	TICK_10: 'tick:10',
	TICK_15: 'tick:15',
	TICK_30: 'tick:30',
	TICK_60: 'tick:60',
}



process.ee3 = new ee3.EventEmitter()




