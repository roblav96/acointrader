// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import MainDrawer from '../components/main-drawer/main-drawer'
// import PinDialog from '../components/pin-dialog/pin-dialog'
// import ExchangeConnect from '../components/exchange-connect/exchange-connect'



@Vts.Component(<VueComponent>{
	name: 'Root',

	components: {
		'main-drawer': MainDrawer,
		// 'pin-dialog': PinDialog,
		// 'exchange-connect': ExchangeConnect,
	},

} as any)
export default class Root extends Vue {

	created() {

	}

	mounted() {
		this.start_fading()
	}

	beforeDestroy() {

	}



	fading = true
	start_fading(duration = 100) {
		this.fading = true
		_.delay(() => this.fading = false, duration)
		_.delay(() => this.fading = null, 1000)
	}



	theme = lockr.get('root.theme', 'dark')
	@Vts.Watch('theme') w_theme(to: string, from: string) {
		lockr.set('root.theme', to)
	}
	toggle_theme() {
		_.delay(() => {
			this.start_fading(300)
			if (this.theme == 'light') return this.theme = 'dark';
			if (this.theme == 'dark') return this.theme = 'light';
		}, 100)
	}



}


