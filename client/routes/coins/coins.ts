// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as exchanges from '../../services/exchanges'
import RouterMixin from '../../mixins/router-mixin'



@Vts.Component(<VueComponent>{
	name: 'Coins',
} as any)
export default class Coins extends Avts.Mixin<Vue & RouterMixin>(Vue, RouterMixin) {

	created() {
		
	}

	mounted() {

	}

	beforeDestroy() {

	}



}


