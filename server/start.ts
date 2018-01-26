// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from './services/errors'
import * as utils from './services/utils'
import * as shared from '../shared/shared'



const allradios = {} as Dict<boolean>
function onradio(radio: Dict<boolean>) {
	shared.object.merge(allradios, radio)
	if (Object.keys(allradios).length < process.$instances) return;
	process.radio.removeListener('radio.ready')
	process.ee3.removeListener(shared.enums.EE3.TICK_01, loopready)
	console.info('shared.enums.READY', shared.enums.READY)
	process.ee3.emit(shared.enums.READY)
}
process.radio.addListener('radio.ready', onradio)

function loopready() { process.radio.emit('radio.ready', { [process.$instance]: process.radio.isReady() }) }
process.ee3.addListener(shared.enums.EE3.TICK_01, loopready)



