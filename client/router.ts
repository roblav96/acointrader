// 

import Vue from 'vue'
import VueRouter, { RouteConfig as VRouteConfig } from 'vue-router'
import * as store from './services/store'

import Root from './root/root'



export const routes = [



] as Array<VRouteConfig>



export const router = new VueRouter({
	routes: routes,
	mode: 'history',
})

Root.options.router = router
Root.options.store = store.store

new Root().$mount('#root')








