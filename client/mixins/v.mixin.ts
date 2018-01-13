// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'



@Vts.Component(<VueComponent>{
	name: 'VMixin',
} as any)
export default class VMixin extends Vue {

	v_starts_case(input: string) { return _.startCase(input) }

	v_exchange_png(id: string) { return 'img/exchanges/' + id + '-logo.png' }



}


