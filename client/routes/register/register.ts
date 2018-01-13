// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import RouterMixin from '../../mixins/router.mixin'



@Vts.Component(<VueComponent>{
	name: 'Register',
} as any)
export default class Register extends Avts.Mixin<Vue & RouterMixin>(Vue, RouterMixin) {

	created() {
		
	}

	mounted() {
		
	}

	beforeDestroy() {

	}
	
	
	
	get keys() {
		return [] // this.$store.state.api_keys
	}
	
	editing = ''





}


