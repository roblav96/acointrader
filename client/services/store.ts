// 

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import lockr from 'lockr'
import * as coinbase from './coinbase'
import * as PinDialog from '../components/pin-dialog/pin-dialog'



class State {
	
	pin = ''

	pin_dialog = new PinDialog.store()
	coinbase = new coinbase.store()

}
declare global { type StoreState = State }



const StoragePlugin = function(store: Store<State>) {
	Object.keys(store.state).forEach(function(key) {
		store.state[key] = lockr.get('store.' + key, store.state[key])
		store.watch(function(state) { return state[key] }, function(to, from) {
			lockr.set('store.' + key, to)
		}, { deep: true })
	})
}



export const store = new Vuex.Store<State>({
	strict: false,
	state: new State(),
	plugins: [StoragePlugin],
})


