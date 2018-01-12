// 

import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)



import Root from './root/root.vue'



new Vue({
	el: '#root',
	render: h => h(Root)
})
