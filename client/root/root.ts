// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import MainDrawer from '../components/main-drawer/main-drawer'



@Vts.Component(<VueComponent>{
	name: 'Root',

	components: {
		'main-drawer': MainDrawer,
	},

} as any)
export default class Root extends Vue {

	created() {

	}

	fading = true
	mounted() {
		_.delay(() => this.fading = false, 100)
		_.delay(() => this.fading = null, 1000)
	}

	beforeDestroy() {

	}



	theme = lockr.get('root.theme', 'dark')
	@Vts.Watch('theme') w_theme(to: string, from: string) {
		lockr.set('root.theme', to)
	}
	v_toggleTheme() {
		if (this.theme == 'light') return this.theme = 'dark';
		if (this.theme == 'dark') return this.theme = 'light';
	}



}


