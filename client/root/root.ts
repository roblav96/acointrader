// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'



@Vts.Component(<VueComponent>{
	name: 'Root',
})
export default class Root extends Vue {
	
	created() {
		
	}

	clipped = false
	drawer = true
	fixed = false
	items = [{
		icon: 'bubble_chart',
		title: 'Inspire',
	}]
	miniVariant = false
	right = true
	rightDrawer = false
	title = 'Vuetify.js'

}


