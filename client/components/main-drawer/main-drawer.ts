// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as router from '../../router'
import VMixin from '../../mixins/v.mixin'



@Vts.Component(<VueComponent>{
	name: 'MainDrawer',
} as any)
export default class MainDrawer extends Avts.Mixin<Vue & VMixin>(Vue, VMixin) {

	created() {
		// this.$vuetify.application.left = 80
	}

	mounted() {

	}

	beforeDestroy() {

	}



	show = false
	hidelock = false
	clicked() {
		_.delay(() => this.show = false, 1)
		this.hidelock = true
		_.delay(() => this.hidelock = false, 1000)
	}

	// thover: number
	hovering = false
	@Vts.Watch('hovering') w_hovering(to: boolean, from: boolean) {
		// clearTimeout(this.thover)
		if (this.hidelock == true) return;
		if (to == true && from == false) {
			// clearTimeout(this.thover)
			this.show = true
			// this.thover = _.delay(() => this.show = true, 500)
		}
		if (to == false && from == true) {
			// clearTimeout(this.thover)
			this.show = false
			// this.thover = _.delay(() => this.show = false, 300)
		}
	}

	get routes() {
		return router.routes.filter(v => !!v.mmenu).map(v => {
			return {
				name: v.name, dname: v.dname, description: v.description, icon: v.icon,
			} as RouteConfig
		})
	}





}


