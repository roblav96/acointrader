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

	directives: {
		render: { inserted: function(el, binding) { el.innerHTML = binding.value } },
	},

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
	get steps() {
		let steps = this.exchange.getSteps()
		let keys = ['API Key', 'API Secret']
		if (this.apiKey.passphrase !== undefined) keys.push('Passphrase');
		let last = keys.pop()
		let words = keys.map(v => '<code>' + v + '</code>').join(', ')
		console.log('words', words)
		steps.push(
			`Copy and paste the provided ${words} and <code>${last}</code> into the <code class="info--text">API Key Pair</code> form in the <code>left column</code>`
		)
		return steps
	}

	v_hrefSettingsUrl(keyurl: string) {
		if (this.step == 1) this.step++;
		this.v_href(keyurl)
	}



}


