// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as exchanges from '../../services/exchanges'
import RouterMixin from '../../mixins/router.mixin'



@Vts.Component(<VueComponent>{
	name: 'Accounts',
} as any)
export default class Accounts extends Avts.Mixin<Vue & RouterMixin>(Vue, RouterMixin) {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



	get exchanges() {
		return exchanges.exchanges
	}

	get api_keys() {
		return this.$store.state.api_keys
	}
	
	

	editing = ''
	
	step = 0





}


