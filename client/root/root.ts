// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import PinDialog from '../components/pin-dialog/pin-dialog'
import MainDrawer from '../components/main-drawer/main-drawer'



@Vts.Component(<VueComponent>{
	name: 'Root',

	components: {
		'pin-dialog': PinDialog,
		'main-drawer': MainDrawer,
	},

} as any)
export default class Root extends Vue {

	created() {

	}

	// keep the initing to allow time for fonts to download and render 
	initing = true
	mounted() {
		setTimeout(() => this.initing = false, 100)
		setTimeout(() => this.initing = null, 1000)
	}

	beforeDestroy() {

	}



}


