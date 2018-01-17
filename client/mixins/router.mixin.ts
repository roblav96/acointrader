// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import * as router from '../router'



@Vts.Component(<VueComponent>{
	name: 'RouterMixin',
} as any)
export default class RouterMixin extends Vue {

	get v_routeDname() { return _.get(router.routes.find(v => v.name == this.$route.name), 'dname') }

	get mainDrawer() { return this.$store.state.mainDrawer }
	v_toggleMainDrawer() { this.mainDrawer.show = !this.mainDrawer.show }



}


