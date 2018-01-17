// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as exchanges from '../../services/exchanges'
import VMixin from '../../mixins/v.mixin'
import RouterMixin from '../../mixins/router.mixin'



@Vts.Component(<VueComponent>{
	name: 'Connect',
} as any)
export default class Connect extends Avts.Mixin<Vue & RouterMixin & VMixin>(Vue, RouterMixin, VMixin) {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



	get exchange() { return exchanges.exchanges.find(v => v.id == this.$route.params.exchange) }
	get name() { return this.exchange.meta.name }
	
	api_key = { key: '', secret: '' } as ExchangeApiKey



}


