// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import * as shared from '../../../shared/shared'
import * as utils from '../../services/utils'
import VMixin from '../../mixins/v-mixin'
import phonelib from 'awesome-phonenumber'



@Vts.Component(<VueComponent>{
	name: 'AuthPrompt',
} as any)
export default class AuthPrompt extends Avts.Mixin<Vue & VMixin>(Vue, VMixin) {

	created() {
		
	}

	mounted() {
		_.delay(() => this.show = true, 1)
		_.delay(() => (this.$refs.email_input as HTMLInputElement).focus(), 300)
	}

	beforeDestroy() {
		this.resolve()
		this.$el.remove()
	}

	resolve: (email?: string) => void



	email = ''
	get isEmail() { return shared.isValidEmail(this.email) }

	phone = ''
	get isPhone() { return true } // utils.isValidPhone(this.email) }

	get valid() {
		return this.isEmail && this.isPhone
	}



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
		let vue = new AuthPrompt().$mount()
		if (process.DEVELOPMENT) email = 'awesome@acointrader.com';
		vue.email = email
		vue.resolve = resolve
		document.getElementById('root').appendChild(vue.$el)
	})
}


