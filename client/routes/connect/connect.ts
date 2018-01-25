// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import clipboard from 'copy-text-to-clipboard'
import * as utils from '../../services/utils'
import * as exchanges from '../../services/exchanges'
import VMixin from '../../mixins/v-mixin'
import RouterMixin from '../../mixins/router-mixin'



@Vts.Component(<VueComponent>{
	name: 'Connect',

	directives: {
		render: { inserted: function(el, binding) { el.innerHTML = binding.value } },
	},

} as any)
export default class Connect extends Avts.Mixin<Vue & RouterMixin & VMixin>(Vue, RouterMixin, VMixin) {

	created() {
		this.apiKey = Object.assign({}, this.exchange.apiKey)
		if (process.DEVELOPMENT && process.$webpack[this.exchange.id]) {
			this.apiKey = Object.assign({}, process.$webpack[this.exchange.id])
		}
	}

	mounted() {
		// console.log('clipboard', clipboard)
		clipboard('coppy this')
	}

	beforeDestroy() {

	}



	get exchange() { return exchanges.exchanges.find(v => v.id == this.$route.params.exchange) }



	apiKey = {} as ExchangeApiKey

	get valid() { return _.compact(Object.keys(this.apiKey).map(k => !this.apiKey[k])).length == 0 }
	get disabled() { return !this.valid || this.saving }

	saving = false
	save() {
		if (!this.valid) return;
		this.saving = true
		this.exchange.saveApiKey(this.apiKey).then(saved => {
			if (saved) this.$router.push({ name: 'accounts' });
			this.saving = false
		})
	}



	step = 1
	@Vts.Watch('step') w_step(to: number, from: number) {
		if (to <= this.steps.length) return;
		let key_input = (this.$refs.key_input as any) as HTMLInputElement
		key_input.focus()
	}

	get steps() {
		let steps = this.exchange.getSteps()
		let keys = ['API Key', 'API Secret']
		if (this.apiKey.passphrase !== undefined) keys.push('Passphrase');
		let last = keys.pop()
		let words = keys.map(v => '<code class="info white--text">' + v + '</code>').join(', ')
		steps.push(`Copy and paste the ${words} and <code class="info white--text">${last}</code> into the blue input fields pinned to the top of this page.`)
		return steps
	}

	clickedUrl() {
		if (this.step == 1) this.step++;
	}



}


