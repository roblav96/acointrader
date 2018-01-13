// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as router from '../../router'
import VMixin from '../../mixins/v.mixin'



export class store {
	show = false
}

@Vts.Component(<VueComponent>{
	name: 'MainDrawer',
} as any)
export default class MainDrawer extends Avts.Mixin<Vue & VMixin>(Vue, VMixin) {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



	get main_drawer() { return this.$store.state.main_drawer }

	thover: number
	hovering = false
	ishovering = false
	@Vts.Watch('ishovering') w_ishovering(to: boolean, from: boolean) {
		if (to == true && from == false) {
			clearTimeout(this.thover)
			this.hovering = true
		}
		if (to == false && from == true) {
			this.hovering = false
			// this.thover = _.delay(() => this.hovering = false, 300)
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


