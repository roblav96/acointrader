// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'



@Vts.Component(<VueComponent>{
	name: 'VTableMixin',
} as any)
export default class VTableMixin extends Vue {

	pagination = {} as VueTablePagination
	v_lastSortBy = this.pagination.sortBy
	@Vts.Watch('pagination.descending') w_pagination(to: boolean, from: boolean) {
		if (to == false && from == true && this.v_lastSortBy != this.pagination.sortBy) {
			this.$nextTick(() => this.pagination.descending = true)
		}
		this.v_lastSortBy = this.pagination.sortBy
	}



}


