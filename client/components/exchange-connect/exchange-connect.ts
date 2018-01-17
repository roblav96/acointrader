// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import moment from 'moment'



export class store {
	show = false
}

@Vts.Component(<VueComponent>{
	name: 'ExchangeConnect',
} as any)
export default class ExchangeConnect extends Vue {

	created() {

	}

	mounted() {
		// _.delay(() => this.exchange_connect.show = true, 1000)
	}

	beforeDestroy() {

	}



	get exchange_connect() { return this.$store.state.exchange_connect }

	@Vts.Watch('exchange_connect.show') w_show(to: boolean, from: boolean) {
		if (to && !from) {
			_.delay(() => (this.$refs.exchange_connect_input as HTMLInputElement).focus(), 300)
			_.delay(() => this.pin = '1234', 500)
		}
	}

	pin = this.$store.state.pin
	@Vts.Watch('pin') w_pin(to: string, from: string) {
		if (to && to.length == 4) this.save();
	}

	get valid() { return this.pin && this.pin.length == 4 }

	save() {
		if (!this.valid) return;
		this.$store.state.pin = this.pin
		this.$store.state.exchange_connect.show = false
	}



}

