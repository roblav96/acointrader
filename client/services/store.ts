// 

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import _ from 'lodash'
import lockr from 'lockr'
import * as utils from './utils'
import * as scope from './scope'
import * as exchanges from './exchanges'
import * as MainDrawer from '../components/main-drawer/main-drawer'
import * as Snackbar from '../components/snackbar/snackbar'



class State {

	scope = scope.state

	apiKeys = exchanges.exchanges.map(v => v.apiKey)
	// markets = exchanges.exchanges.map(v => v.market)
	// accounts = exchanges.exchanges.map(v => v.account)

	mainDrawer = MainDrawer.state
	snackbar = Snackbar.state

}
declare global { type StoreState = State }



const StoragePlugin = function(store: Store<State>) {
	Object.keys(store.state).forEach(function(key) {

		const save = [
			'mainDrawer',
		]
		if (save.indexOf(key) == -1) return;

		let value = lockr.get('store.' + key, store.state[key])
		store.state[key] = value
		lockr.set('store.' + key, value)

		store.watch(function(state) { return state[key] }, function(to, from) {
			lockr.set('store.' + key, to)
		}, { deep: true })

	})
}



export const store = new Vuex.Store<State>({
	strict: false,
	state: new State(),
	plugins: [StoragePlugin],
	getters: {

	}
})

// console.log('store.state.scope', store.state.scope)
// console.log('store.state.apiKeys', store.state.apiKeys)







// const StoragePlugin = function(store: Store<State>) {
// 	Object.keys(store.state).forEach(function(key) {

// 		const save = [
// 			'mainDrawer',
// 			'api_keys',
// 		]
// 		if (save.indexOf(key) == -1) return;

// 		const uniq_key = {
// 			'api_keys': 'id',
// 		}[key] as string

// 		let value = store.state[key]
// 		let saved = lockr.get('store.' + key, value)

// 		if (_.isPlainObject(_.get(value, '[0]')) && _.isPlainObject(_.get(saved, '[0]'))) {
// 			utils.array_merge_safely(value, saved, uniq_key)

// 		} else if (_.isPlainObject(value) && _.isPlainObject(saved)) {
// 			utils.merge_safely(value, saved)

// 		} else value = saved;

// 		store.state[key] = value
// 		lockr.set('store.' + key, value)

// 		store.watch(function(state) { return state[key] }, function(to, from) {
// 			lockr.set('store.' + key, to)
// 		}, { deep: true })

// 	})
// }




