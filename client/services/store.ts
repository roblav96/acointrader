// 

import Vue from 'vue'
import Vuex from 'vuex'
import lockr from 'lockr'
import * as coinbase from './coinbase'
import * as PinDialog from '../components/pin-dialog/pin-dialog'



class State {

	pin_dialog = new PinDialog.store()
	coinbase = new coinbase.store()

}
declare global { type StoreState = State }

export const store = new Vuex.Store<State>({
	strict: false,
	state: new State(),
})




