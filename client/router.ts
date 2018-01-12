// 

import Vue from 'vue'
import VueRouter, { RouteConfig as VRouteConfig } from 'vue-router'
import * as store from './services/store'

import Root from './root/root'
import Landing from './routes/landing/landing'
import Coinbase from './routes/coinbase/coinbase'



export const routes = [

	{
		name: 'landing',
		path: '/landing',
		component: Landing,
	},

	{
		name: 'coinbase',
		path: '/coinbase',
		component: Coinbase,
	},

	{
		path: '*',
		redirect: { name: 'landing' },
	},

] as Array<VRouteConfig>



export const router = new VueRouter({
	routes: routes,
	mode: 'history',
})

Root.options.router = router
Root.options.store = store.store

new Root().$mount('#root')








