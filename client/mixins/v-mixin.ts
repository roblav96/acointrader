// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import { parse as urlparse } from 'url'



@Vts.Component(<VueComponent>{
	name: 'VMixin',
} as any)
export default class VMixin extends Vue {

	v_start_case(str: string) { return _.startCase(str) }
	v_truncate(str: string, length = 32) { return _.truncate(str, { length }) }

	v_domain(url: string) { return urlparse(url).host }

	v_href(url: string, target = '_blank') { window.open(url, target) }

	v_flag_png(country: string) { return '/img/flags/' + country.toLowerCase() + '.png' }

	v_exchange_png(id: string) { return '/img/exchanges/' + id + '-logo.png' }
	
	
	
}


