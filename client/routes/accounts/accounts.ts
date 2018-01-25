// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import lockr from 'lockr'
import * as exchanges from '../../services/exchanges'
import VMixin from '../../mixins/v-mixin'
import VTableMixin from '../../mixins/v-table-mixin'
import RouterMixin from '../../mixins/router-mixin'



@Vts.Component(<VueComponent>{
	name: 'Accounts',
} as any)
export default class Accounts extends Avts.Mixin<Vue & RouterMixin & VTableMixin & VMixin>(Vue, RouterMixin, VTableMixin, VMixin) {

	created() {

	}

	mounted() {
		_.delay(() => (this.$refs.image_input as HTMLInputElement).focus(), 300)
	}

	beforeDestroy() {

	}



	get exchanges() { return exchanges.exchanges.map(v => v.getMeta()) }

	headers = ([
		// { text: 'Website', value: 'website', sortable: false },
		{ text: 'Country', value: 'countryCode' },
		{ text: 'Logo', value: '', sortable: false },
		{ text: 'Exchange', value: 'name' },
		{ text: 'API Key', value: 'api_key.key', sortable: false },
		{ text: 'Actions', value: '', sortable: false },
	] as Array<VueTableHeader>).map(function(header) {
		if (!header.align) header.align = 'left';
		return header
	})

	pagination = { sortBy: '', descending: false, rowsPerPage: -1 } as VueTablePagination



	deleting = {} as exchanges.ExchangeMetadata
	deletingDialog = false

	disconnectApiKey(id: string) {
		if (process.DEVELOPMENT) return this.deleteApiKey(id);
		this.deleting = exchanges.exchanges.find(v => v.id == id).getMeta()
		this.deletingDialog = true
	}

	deleteApiKey(id: string) {
		let exchange = exchanges.exchanges.find(v => v.id == id)
		exchange.deleteApiKey()
		this.deletingDialog = false
	}



	imagesearch = ''
	submitsearch(query: string) {
		if (!query) return;
		query = query.toLowerCase().trim()
		// query = encodeURIComponent(query)
		// window.open('https://yandex.com/images/search?text=' + query + '&isize=large')
		// window.open('https://searx.me/?q=' + query + '&categories=images&language=en-US')
		// window.open('https://www.qwant.com/?q=' + query + '&t=images&size=large')
		// window.open('https://images.search.yahoo.com/search/images?p=' + query + '&imgsz=large')
		window.open('https://www.google.com/search?q=' + query + '&source=lnms&tbm=isch&tbs=isz:l')
		window.open('https://duckduckgo.com/?q=' + query + '&ia=images&iar=images&iax=images&iaf=size%3Aimagesize-large')
		window.open('https://www.bing.com/images/search?q=' + query + '&qft=+filterui:imagesize-large')
	}


}


