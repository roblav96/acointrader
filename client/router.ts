// 

import Vue from 'vue'
import VueRouter from 'vue-router'
// import * as store from './services/store'
// import * as security from './services/security'

import Root from './root/root'



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




