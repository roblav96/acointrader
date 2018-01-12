// 

import Vue from 'vue'
import VueRouter from 'vue-router'
import * as store from './services/store'

import Root from './root/root'
import Register from './routes/register/register'
import Coins from './routes/coins/coins'



export const routes = [

	{
		dname: 'Coinbase & Exchanges',
		icon: 'mdi-account-key',
		mmenu: true,
		name: 'register',
		path: '/register',
		component: Register,
	},

	{
		dname: 'Coins',
		icon: 'mdi-coin',
		mmenu: true,
		name: 'coins',
		path: '/coins',
		component: Coins,
	},

	{
		path: '*',
		redirect: { name: 'coins' },
	},

] as Array<RouteConfig>



export const router = new VueRouter({
	routes: routes,
	mode: 'history',
})

Root.options.router = router
Root.options.store = store.store

new Root().$mount('#root')







