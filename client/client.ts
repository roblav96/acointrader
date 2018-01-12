// 



import 'animate.css'
import 'chartist/dist/chartist.min.css'
import 'vuetify/dist/vuetify.css'
import './styles/styles.css'



import 'correcting-interval'
import ee3 from 'eventemitter3'
process.ee3 = new ee3.EventEmitter()



import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

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


