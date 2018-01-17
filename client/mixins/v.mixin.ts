// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import url from 'url'



@Vts.Component(<VueComponent>{
	name: 'VMixin',
} as any)
export default class VMixin extends Vue {

	v_starts_case(input: string) { return _.startCase(input) }

	v_flag_png(country: string) { return '/img/flags/' + country.toLowerCase() + '.png' }

	v_exchange_png(id: string) { return '/img/exchanges/' + id + '-logo.png' }
	v_exchange_active(id: string) { return !!this.$store.state.api_keys.find(v => v.id == id) }

	v_domain(input: string) {
		let parsed = url.parse(input)
		return parsed.host
	}



}


