// 

import Vue from 'vue'
import VueRouter from 'vue-router'
import * as store from './services/store'

import Root from './root/root'
import Register from './routes/register/register'
import Coins from './routes/coins/coins'



export const routes = [

	{
		dname: 'Exchange Account Manager',
		description: 'Coinbase, GDAX, Binance',
		icon: 'mdi-account-key',
		mmenu: true,
		name: 'register',
		path: '/register',
		component: Register,
	},

	{
		dname: 'Trending Gainers and Losers',
		// icon: 'mdi-trending-up',
		icon: 'mdi-shuffle-variant',
		description: 'Past 24hr flips and flops',
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








