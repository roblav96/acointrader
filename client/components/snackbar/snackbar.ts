// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import * as utils from '../../services/utils'



export const state = {
	items: [] as Array<SnackbarItem>,
}

@Vts.Component(<VueComponent>{
	name: 'Snackbar',
} as any)
export default class Snackbar extends Vue {

	get items() { return this.$store.state.snackbar.items }
	@Vts.Watch('items') w_items(to: Array<SnackbarItem>) {
		to.forEach(v => {
			if (Number.isFinite(v.timeout)) return;
			v.timeout = _.delay(this.splice, v.duration, v.id)
		})
	}

	splice(id: string) {
		let i = this.items.findIndex(v => v.id == id)
		if (i == -1) return;
		clearTimeout(this.items[i].timeout)
		this.items.splice(i, 1)
	}

	onmouseenter(id: string) {
		let item = this.items.find(v => v.id == id)
		if (!item) return;
		clearTimeout(item.timeout)
	}

}



declare global {
	interface SnackbarItem {
		id?: string
		message: string
		duration?: number
		timeout?: number
		color?: string
		icon?: string
	}
}

export function push(item: SnackbarItem) {
	if (state.items.find(v => v.message == item.message)) return;
	item.id = utils.randomBytes(8)
	item.color = item.color || 'secondary'
	item.duration = item.duration || 5000
	state.items.push(item)
}




