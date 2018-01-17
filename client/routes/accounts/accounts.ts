// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as exchanges from '../../services/exchanges'
import VMixin from '../../mixins/v.mixin'
import RouterMixin from '../../mixins/router.mixin'



@Vts.Component(<VueComponent>{
	name: 'Accounts',
} as any)
export default class Accounts extends Avts.Mixin<Vue & RouterMixin & VMixin>(Vue, RouterMixin, VMixin) {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



	get exchanges() { return exchanges.exchanges.map(v => v.getMeta()) }

	headers = ([
		{ text: 'Website', value: 'website', sortable: false },
		{ text: 'Country', value: 'countryCode' },
		{ text: 'Logo', value: '', sortable: false },
		{ text: 'Exchange', value: 'name' },
		{ text: 'API Key', value: 'api_key.key', sortable: false },
		{ text: 'Actions', value: '', sortable: false },
	] as Array<VueTableHeader>).map(function(header) {
		if (!header.align) header.align = 'left';
		return header
	})

	v_pagination = { sortBy: '', descending: false, rowsPerPage: -1 } as VueTablePagination

	v_deleteApiKey(id: string) {
		let exchange = exchanges.exchanges.find(v => v.id == id)
		exchange.deleteApiKey()
	}
	
	deleteDialog = true





	// get api_keys() {
	// 	return this.$store.state.api_keys
	// }





	// tuts_id = ''
	// get tutsing() {
	// 	return this.exchanges.find(v => v.id == this.tuts_id) || {} as exchanges.ExchangeBuilder
	// }

	// setTutsId(id: string) {
	// 	console.log('setTutsId > id', id)
	// 	this.tuts_id = id
	// 	console.log('this.visibles', this.visibles)
	// 	console.log('this.tutsing', JSON.stringify(this.tutsing, null, 4))
	// }

	step = 0



	// wtfidk = true
	// @Vts.Watch('wtfidk', { deep: true }) w_wtfidk(to: any, from: any) {
	// 	console.log('to', to)
	// 	console.log('from', from)
	// }





}


