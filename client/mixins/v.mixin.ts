// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import { parse as urlparse } from 'url'



@Vts.Component(<VueComponent>{
	name: 'VMixin',
} as any)
export default class VMixin extends Vue {

	v_start_case(str: string) { return _.startCase(str) }

	v_domain(url: string) { return urlparse(url).host }

	v_href(url: string, target = '_blank') { window.open(url, target) }

	v_flag_png(country: string) { return '/img/flags/' + country.toLowerCase() + '.png' }

	v_exchange_png(id: string) { return '/img/exchanges/' + id + '-logo.png' }
	v_exchange_active(id: string) { return !!this.$store.state.api_keys.find(v => v.id == id) }
	
	

}



// export const mixin = new VMixin()
// console.log('mixin', mixin)

// let keys = Object.keys(mixin)
// console.log('keys', keys)
// // let fns = _.functionsIn(mixin)
// // console.log('fns', fns)
// let keysIn = _.keysIn(mixin) // _.difference(_.keysIn(mixin), fns)
// console.log('keysIn', keysIn)

// _.keysIn(mixin).forEach(function(key) {
// 	if (key.indexOf('v_') == 0) return;
// 	_.unset(mixin, key)
// })





