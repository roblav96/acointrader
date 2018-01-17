// 

import Vue from 'vue'
import VueRouter from 'vue-router'
import * as store from './services/store'

import Root from './root/root'
import Accounts from './routes/accounts/accounts'
import Connect from './routes/connect/connect'
import Coins from './routes/coins/coins'
import Search from './routes/search/search'
import Intro from './routes/intro/intro'



export const routes = [

	{
		dname: 'My Exchange Accounts',
		description: 'Link with Coinbase and more',
		icon: 'mdi-account-key',
		mmenu: true,
		name: 'accounts',
		path: '/accounts',
		component: Accounts,
	},
	{
		name: 'connect',
		path: '/connect/:exchange',
		component: Connect,
	},

	{
		dname: 'Welcome',
		icon: 'mdi-emoticon',
		description: 'Your jorney starts here',
		mmenu: true,
		name: 'intro',
		path: '/intro',
		component: Intro,
	},

	// {
	// 	dname: 'Search Anything',
	// 	description: 'Coins, symbols, ICOs, exchanges',
	// 	icon: 'mdi-magnify',
	// 	bold: true,
	// 	mmenu: true,
	// 	name: 'search',
	// 	path: '/search',
	// 	component: Search,
	// },

	{
		dname: 'Top Gainers and Losers',
		icon: 'mdi-trending-up',
		description: 'Past 24hr flips and flops',
		bold: true,
		mmenu: true,
		name: 'coins',
		path: '/coins',
		component: Coins,
	},

	{
		path: '*',
		redirect: { name: 'intro' },
	},

] as Array<RouteConfig>



export const router = new VueRouter({
	mode: 'history',
	routes: routes,
})

Root.options.router = router
Root.options.store = store.store

new Root().$mount('#root')




