// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as utils from '../../services/utils'
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
		Object.assign(this.api_key, this.exchange.api_key)
		console.log('this.api_key', JSON.stringify(this.api_key, null, 4))

		this.$nextTick(() => {
			let key_form = (this.$refs.key_form as any).$el as HTMLElement
			key_form.style.width = key_form.clientWidth + 'px'
			key_form.style.position = 'fixed'
		})
	}

	beforeDestroy() {

	}



	get exchange() { return exchanges.exchanges.find(v => v.id == this.$route.params.exchange) }
	// get meta() { return this.exchange.meta }



	// api_key = { key: '', secret: '', passphrase: '' } as ExchangeApiKey
	api_key = {} as ExchangeApiKey

	// get disabled() { return (!!this.api_key.key && !!this.api_key.secret) == false }
	get disabled() { return (!!this.api_key.key && !!this.api_key.secret) == false }

	save() {
		if (this.disabled) return;
		console.log('this.api_key', JSON.stringify(this.api_key, null, 4))
	}



	step = 1
	steps = [
		{
			title: 'Click the following url to setup your account API key:',
			subtitle: '',
		}
	]

	href_keyurl(keyurl: string) {
		if (this.step == 1) this.step++;
		this.v_href(keyurl)
	}






}


