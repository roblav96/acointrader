// 

import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash'
import * as shared from '../shared/shared'
import * as utils from './services/utils'
import * as security from './services/security'
import * as store from './services/store'

import Root from './components/root/root'



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
Root.options.store = store.store

export const vm = new Root().$mount('#root')
console.log('!!vm', !!vm)


security.init().then(function() {
	store.store.state.blockui = false
})




