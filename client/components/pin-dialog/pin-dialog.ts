// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'



export class store {
	show = false
}

@Vts.Component(<VueComponent>{
	name: 'PinDialog',
})
export default class PinDialog extends Vue {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



	get pin_dialog() { return this.$store.state.pin_dialog }



}

