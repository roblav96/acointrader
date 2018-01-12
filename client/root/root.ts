// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import PinDialog from '../components/pin-dialog/pin-dialog'
import MainDrawer from '../components/main-drawer/main-drawer'



@Vts.Component(<VueComponent>{
	name: 'Root',

	components: {
		'pin-dialog': PinDialog,
		'main-drawer': MainDrawer,
	},

})
export default class Root extends Vue {

	created() {

	}

	initing = true
	mounted() {
		setTimeout(() => this.initing = false, 1)
		// if (!this.$store.state.pin) this.$store.state.pin_dialog.show = true;
	}

	beforeDestroy() {

	}



}

