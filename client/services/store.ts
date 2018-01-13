// 

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import lockr from 'lockr'
import * as exchanges from './exchanges'
import * as MainDrawer from '../components/main-drawer/main-drawer'
import * as PinDialog from '../components/pin-dialog/pin-dialog'



class State {

	pin = ''
	pin_dialog = new PinDialog.store()

	main_drawer = new MainDrawer.store()

	api_keys = exchanges.exchanges.map(v => v.api_key)

}
declare global { type StoreState = State }



const StoragePlugin = function(store: Store<State>) {
	Object.keys(store.state).forEach(function(key) {

		const save = [
			'api_keys',
		]
		if (save.indexOf(key) == -1) return;

		store.state[key] = lockr.get('store.' + key, store.state[key])
		console.log('store.state[' + key + ']', store.state[key])

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



console.log('store.state', store.state)




