// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import * as utils from '../../services/utils'
import VMixin from '../../mixins/v-mixin'



@Vts.Component(<VueComponent>{
	name: 'RegisterDialog',
} as any)
export default class RegisterDialog extends Avts.Mixin<Vue & VMixin>(Vue, VMixin) {

	static state = {
		show: false,
	}

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}
	
	
	
	// get state() { return this.$store.state.registerDialog }
	
	
	
	save() {
		console.warn('save')
	}
	



}


