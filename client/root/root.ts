// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import MainDrawer from '../components/main-drawer/main-drawer'



@Vts.Component(<VueComponent>{
	name: 'Root',

	components: {
		'main-drawer': MainDrawer,
	},
	
})
export default class Root extends Vue {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}
	
	

}


