// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import * as utils from '../../services/utils'
import VMixin from '../../mixins/v.mixin'



@Vts.Component(<VueComponent>{
	name: 'EmailDialog',
} as any)
export default class EmailDialog extends Avts.Mixin<Vue & VMixin>(Vue, VMixin) {

	mounted() {
		this.show = true
		_.delay(() => {
			let email_input = (this.$refs.email_input as any) as HTMLInputElement
			email_input.focus()
		}, 300)
	}

	beforeDestroy() {
		this.resolve()
	}

	resolve: (email?: string) => void

	email = ''
	get valid() { return utils.isValidEmail(this.email) }

	show = false
	@Vts.Watch('show') w_show(to: boolean) {
		if (to != false) return;
		_.delay(() => this.$destroy(), 300)
	}

	save() {
		this.resolve(this.email)
		this.show = false
	}

}



export function prompt() {
	return new Promise(function(resolve, reject) {
		let vue = new EmailDialog().$mount()
		vue.resolve = resolve
		document.getElementById('root').appendChild(vue.$el)
	})
}


