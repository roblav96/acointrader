// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as utils from '../../services/utils'
import * as security from '../../services/security'
import VMixin from '../../mixins/v-mixin'
import RouterMixin from '../../mixins/router-mixin'



@Vts.Component(<VueComponent>{
	name: 'Auth',
} as any)
export default class Auth extends Avts.Mixin<Vue & RouterMixin & VMixin>(Vue, RouterMixin, VMixin) {

	created() {
		
	}

	mounted() {
		
	}

	beforeDestroy() {

	}



}


