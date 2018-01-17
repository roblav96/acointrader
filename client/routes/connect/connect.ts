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
		this.apiKey = Object.assign({}, this.exchange.apiKey)
		this.$nextTick(() => {
			let key_form = (this.$refs.key_form as any).$el as HTMLElement
			key_form.style.width = key_form.clientWidth + 'px'
			key_form.style.position = 'fixed'
		})
		this.steps = utils.clone(STEPS.find(v => v.id == this.exchange.id).steps)
		console.log('this.steps', this.steps)
	}

	beforeDestroy() {

	}



	get exchange() { return exchanges.exchanges.find(v => v.id == this.$route.params.exchange) }



	apiKey = {} as ExchangeApiKey

	get valid() { return _.compact(Object.keys(this.apiKey).map(k => !this.apiKey[k])).length == 0 }

	save() {
		if (!this.valid) return;
		console.log('this.apiKey', JSON.stringify(this.apiKey, null, 4))
		// this.exchange.saveApiKey(this.apiKey)
	}



	step = 1
	steps = [] as Array<string>

	v_hrefSettingsUrl(keyurl: string) {
		if (this.step == 1) this.step++;
		this.v_href(keyurl)
	}



}



const STEPS = [
	{
		id: 'coinbase',
		steps: [
			`
			In the
			<code>API Access</code> tab, under the
			<code>API Keys</code> section, click the
			<code>+ New API Key</code> button
			`,
			`
			In the
			<code>Accounts</code> section, click the
			<code>all</code> checkbox
			`,
		],
	}
]


