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



	deleting = {} as exchanges.ExchangeMetadata
	deletingDialog = false

	disconnectApiKey(id: string) {
		if(process.DEVELOPMENT) return this.deleteApiKey(id);
		this.deleting = exchanges.exchanges.find(v => v.id == id).getMeta()
		this.deletingDialog = true
	}

	deleteApiKey(id: string) {
		let exchange = exchanges.exchanges.find(v => v.id == id)
		exchange.deleteApiKey()
		this.deletingDialog = false
	}

	connectApiKey(id: string) {
		if (process.DEVELOPMENT && process.$webpack[id]) {
			let exchange = exchanges.exchanges.find(v => v.id == id)
			exchange.saveApiKey(process.$webpack[id])
			return
		}
		this.$router.push({ name: 'connect', params: { exchange: id } })
	}



}


