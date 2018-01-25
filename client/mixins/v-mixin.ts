// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import * as Vuetify from 'vuetify'
import { parse as urlparse } from 'url'



// interface VBreakpoints extends Vuetify.VuetifyBreakpoint {
interface VBreakpoints {
	height: number
	lg: boolean
	lgAndDown: boolean
	lgAndUp: boolean
	lgOnly: boolean
	md: boolean
	mdAndDown: boolean
	mdAndUp: boolean
	mdOnly: boolean
	name: string
	sm: boolean
	smAndDown: boolean
	smAndUp: boolean
	smOnly: boolean
	width: number
	xl: boolean
	xlOnly: boolean
	xs: boolean
	xsOnly: boolean
}



@Vts.Component(<VueComponent>{
	name: 'VMixin',
} as any)
export default class VMixin extends Vue {

	v_development = process.DEVELOPMENT
	v_production = process.PRODUCTION

	get v_bks() { return this.$vuetify.breakpoint }

	v_start_case(str: string) { return _.startCase(str) }
	v_truncate(str: string, length = 32) { return _.truncate(str, { length }) }

	v_domain(url: string) { return urlparse(url).host }

	v_href(url: string, target = '_blank') { window.open(url, target) }

	v_flag_png(country: string) { return '/img/flags/' + country.toLowerCase() + '.png' }

	v_exchange_png(id: string) { return '/img/exchanges/' + id + '.png' }



}


