// 

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import _ from 'lodash'
import lockr from 'lockr'
import * as utils from './utils'
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

		const uniq_key = {
			api_keys: 'id',
		}[key] as string

		let value = store.state[key]
		// let value = [
		// 	{
		// 		"id": "coinbase",
		// 		"key": "COINBASE KEY FALSE FALSE FALSE FALSE",
		// 		"secret": ""
		// 	},
		// 	{
		// 		"id": "binance",
		// 		"key": "",
		// 		"secret": ""
		// 	},
		// 	{
		// 		"id": "huobi",
		// 		"key": "",
		// 		"secret": ""
		// 	},
		// 	{
		// 		"id": "poloniex",
		// 		"key": "",
		// 		"secret": ""
		// 	}
		// ]
		console.log('store [' + key + '] > value', JSON.stringify(value, null, 4))

		let saved = lockr.get('store.' + key, value)
		// let saved = [
		// 	{
		// 		"id": "coinbase",
		// 		// "key": "",
		// 		"key": "COINBASE KEY TRUE TRUE TRUE TRUE",
		// 		"secret": ""
		// 	},
		// 	// {
		// 	// 	"id": "binance",
		// 	// 	"key": "",
		// 	// 	"secret": ""
		// 	// },
		// 	{
		// 		"id": "huobi",
		// 		"key": "HUOBI KEY HUOBI KEY HUOBI KEY HUOBI KEY HUOBI KEY",
		// 		"secret": ""
		// 	},
		// 	{
		// 		"id": "poloniex",
		// 		"key": "",
		// 		"secret": ""
		// 	}
		// ]
		console.log('store [' + key + '] > saved', JSON.stringify(saved, null, 4))

		if (Array.isArray(value) && _.isPlainObject(value[0]) && Array.isArray(saved) && _.isPlainObject(saved[0])) {
			utils.array_merge_safely(value, saved, uniq_key)
			
		} else if (_.isPlainObject(value) && _.isPlainObject(saved)) {
			utils.merge_safely(value, saved)
			
		} else {
			value = saved
			
		}

		store.state[key] = value
		lockr.set('store.' + key, value)
		console.log('store [' + key + '] > set', JSON.stringify(value, null, 4))

		store.watch(function(state) { return state[key] }, function(to, from) {
			console.log('store [' + key + '] > save', JSON.stringify(to, null, 4))
			lockr.set('store.' + key, to)
		}, { deep: true })

	})
}



export const store = new Vuex.Store<State>({
	strict: false,
	state: new State(),
	plugins: [StoragePlugin],
})

console.log('store.state.api_keys', store.state.api_keys)




