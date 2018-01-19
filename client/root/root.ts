// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import MainDrawer from '../components/main-drawer/main-drawer'
import Snackbar from '../components/snackbar/snackbar'



@Vts.Component(<VueComponent>{
	name: 'Root',

	components: {
		'main-drawer': MainDrawer,
		'snackbar': Snackbar,
	},

} as any)
export default class Root extends Vue {

	created() {

	}

	initing = true
	mounted() {
		_.delay(() => this.initing = false, 100)
		_.delay(() => this.initing = null, 1000)
	}

	beforeDestroy() {

	}



	theme = lockr.get('root.theme', 'dark')
	@Vts.Watch('theme') w_theme(to: string) { lockr.set('root.theme', to) }

	theming = false
	toggleTheme() {
		document.body.style.backgroundColor = this.theme == 'dark' ? 'rgb(255, 255, 255)' : 'rgb(48, 48, 48)'
		_.delay(() => this.theming = true, 1)
		_.delay(() => this.theme = this.theme == 'dark' ? 'light' : 'dark', 300)
		_.delay(() => this.theming = false, 600)
	}



}


