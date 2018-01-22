// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as router from '../../router'
import VMixin from '../../mixins/v-mixin'
import Snackbar from '../snackbar/snackbar'



@Vts.Component(<VueComponent>{
	name: 'MainDrawer',
} as any)
export default class MainDrawer extends Avts.Mixin<Vue & VMixin>(Vue, VMixin) {

	static state = {
		show: true,
		debugBreakpoints: false,
	}

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



	get state() { return this.$store.state.mainDrawer }

	get routes() {
		return router.routes.filter(v => !!v.mmenu).map(v => {
			return {
				name: v.name, dname: v.dname,
				description: v.description,
				icon: v.icon, bold: v.bold,
			} as RouteConfig
		})
	}



	clearLocalStorage() {
		window.localStorage.clear()
		location.reload(true)
	}



}


