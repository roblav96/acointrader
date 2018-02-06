// 

process.ENV = process.$webpack.env
process.DEVELOPMENT = process.ENV == 'DEVELOPMENT'
process.PRODUCTION = process.ENV == 'PRODUCTION'
process.CLIENT = true
process.SERVER = false

process.$domain = 'https://acointrader.com'
if (process.DEVELOPMENT) process.$domain = 'http://dev.acointrader.com';

process.$version = '0.0.1'



// if (process.PRODUCTION) {
// let script = document.createElement('script')
// script.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=explicit')
// document.body.appendChild(script)
// }



import 'node-forge/dist/prime.worker.min.js'
import 'node-forge/dist/prime.worker.min.js.map'

import 'mdi/css/materialdesignicons.css'
import 'animate.css'
import 'chartist/dist/chartist.css'
import 'buefy/lib/buefy.css'
import './styles/styles.css'
import './styles/root.css'



import ee3 from 'eventemitter3'
process.ee3 = new ee3.EventEmitter()



import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Buefy from 'buefy'

Vue.config.devtools = false
Vue.config.productionTip = false
Vue.config.performance = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Buefy, {
	defaultSnackbarDuration: 3000,
	defaultToastDuration: 3000,
	defaultInputAutocomplete: 'off',
	defaultNoticeQueue: false,
})



require('./router')


