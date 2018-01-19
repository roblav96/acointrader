// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import * as utils from '../../services/utils'
import VMixin from '../../mixins/v-mixin'



@Vts.Component(<VueComponent>{
	name: 'EmailPrompt',
} as any)
export default class EmailPrompt extends Avts.Mixin<Vue & VMixin>(Vue, VMixin) {

	created() {

	}

	mounted() {
		_.delay(() => this.show = true, 1)
		_.delay(() => (this.$refs.email_input as HTMLInputElement).focus(), 300)
		if (process.DEVELOPMENT) _.delay(() => this.email = 'awesome@acointrader.com', 500);
	}

	beforeDestroy() {
		this.resolve()
		this.$el.remove()
	}



	resolve: (email?: string) => void

	email = ''
	get valid() { return utils.isValidEmail(this.email) }

	show = false
	@Vts.Watch('show') w_show(to: boolean) {
		if (to != false) return;
		this.resolve()
		_.delay(() => this.$destroy(), 300)
	}

	save() {
		this.resolve(this.email)
		this.show = false
	}

}



export function prompt(email = '') {
	return new Promise<string>(function(resolve, reject) {
		let vue = new EmailPrompt().$mount()
		vue.email = email
		vue.resolve = resolve
		document.getElementById('root').appendChild(vue.$el)
	})
}


