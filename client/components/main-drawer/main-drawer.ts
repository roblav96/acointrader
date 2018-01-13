// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as router from '../../router'



export class store {
	show = false
}

@Vts.Component(<VueComponent>{
	name: 'MainDrawer',
})
export default class MainDrawer extends Vue {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



	get main_drawer() { return this.$store.state.main_drawer }

	hovering = true

	get routes() {
		let routes = router.routes.filter(v => !!v.icon && !!v.mmenu).map(v => {
			return { dname: v.dname, icon: v.icon, name: v.name } as RouteConfig
		})
		return routes
		// console.log('routes', JSON.stringify(routes, null, 4))
		// return _.orderBy(routes, ['category', 'dname'], ['asc', 'asc'])
	}





}


