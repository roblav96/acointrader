// 

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import lockr from 'lockr'
import * as keys from './keys'
import * as MainDrawer from '../components/main-drawer/main-drawer'
import * as PinDialog from '../components/pin-dialog/pin-dialog'



class State {

	pin = ''

	pin_dialog = new PinDialog.store()
	main_drawer = new MainDrawer.store()
	keys = new keys.store()

}
declare global { type StoreState = State }



const StoragePlugin = function(store: Store<State>) {
	Object.keys(store.state).forEach(function(key) {

		const save = [
			'keys',
		]
		if (save.indexOf(key) == -1) return;

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


