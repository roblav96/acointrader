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
	name: 'PinDialog',
} as any)
export default class PinDialog extends Vue {

	created() {

	}

	mounted() {
		// _.delay(() => this.pin_dialog.show = true, 1000)
	}

	beforeDestroy() {

	}



	get pin_dialog() { return this.$store.state.pin_dialog }

	@Vts.Watch('pin_dialog.show') w_show(to: boolean, from: boolean) {
		if (to && !from) {
			_.delay(() => (this.$refs.pin_dialog_input as HTMLInputElement).focus(), 300)
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
		this.$store.state.pin_dialog.show = false
	}



}

