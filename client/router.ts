// 

import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash'
import * as shared from '../shared/shared'
import * as utils from './services/utils'

import Root from './root/root'

console.log('_.keys(shared)', _.keys(shared))
console.log('_.keysIn(shared)', _.keysIn(shared))
console.log('_.functions(shared)', _.functions(shared))
console.log('_.functionsIn(shared)', _.functionsIn(shared))

export const routes = [

	// {
	// 	dname: 'My Exchange Accounts',
	// 	description: 'Connect with Coinbase and more',
	// 	icon: 'mdi-account-key',
	// 	mmenu: true,
	// 	name: 'accounts',
	// 	path: '/accounts',
	// 	component: Accounts,
	// },
	
	// {
	// 	path: '*',
	// 	redirect: { name: 'accounts' },
	// },

] as Array<RouteConfig>



export const router = new VueRouter({
	mode: 'history',
	routes: routes,
})

Root.options.router = router
// Root.options.store = store.store



new Root().$mount('#root')
// security.getReady().then(function() {
// 	new Root().$mount('#root')
// 	return Promise.resolve()
// })




