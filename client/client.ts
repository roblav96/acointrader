// 

process.$env = process.$webpack.env
process.DEVELOPMENT = process.$env == 'DEVELOPMENT'
process.PRODUCTION = process.$env == 'PRODUCTION'
process.CLIENT = true
process.SERVER = false

process.$domain = 'https://acointrader.com'
if (process.DEVELOPMENT) process.$domain = 'http://dev.acointrader.com';

process.$version = '1'



// if (process.PRODUCTION) {
// let script = document.createElement('script')
// script.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=explicit')
// document.body.appendChild(script)
// }



import 'animate.css'
import 'chartist/dist/chartist.min.css'
import 'vuetify/dist/vuetify.css'
import './styles/styles.css'
import './styles/root.css'



import 'correcting-interval'
import ee3 from 'eventemitter3'
process.ee3 = new ee3.EventEmitter()

import SecureLS from 'secure-ls'
process.sls = new SecureLS({ encodingType: 'aes' })



import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.config.devtools = false
Vue.config.productionTip = false
Vue.config.performance = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vuetify, {
	theme: {
		primary: '#21CE99',
		secondary: '#424242',
		accent: '#303030',
		info: '#42A5F5',
		warning: '#FFA000',
		error: '#F1563A',
		success: '#21CE99',
	}
})



require('./router')


