// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import * as router from '../router'



@Vts.Component(<VueComponent>{
	name: 'RouterMixin',
})
export default class RouterMixin extends Vue {

	get router_dname() {
		return _.get(router.routes.find(v => v.name == this.$route.name), 'dname')
	}





}


