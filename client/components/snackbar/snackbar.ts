// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'
import * as utils from '../../services/utils'



declare global {
	interface SnackbarItem { message: string, duration?: number, color?: string, icon?: string, id?: string, timeout?: number }
}

@Vts.Component(<VueComponent>{
	name: 'Snackbar',
} as any)
export default class Snackbar extends Vue {

	static state = { items: [] as Array<SnackbarItem> }

	static push(item: SnackbarItem) {
		if (Snackbar.state.items.find(v => v.message == item.message)) return;
		Snackbar.state.items.push(item)
	}

	get items() { return this.$store.state.snackbar.items }
	@Vts.Watch('items') w_items(items: Array<SnackbarItem>) {
		items.forEach(item => {
			if (Number.isFinite(item.timeout)) return;
			item.id = utils.randomBytes(8)
			item.color = item.color || 'secondary'
			if (!item.icon) {
				if (item.color == 'success') item.icon = 'mdi-check';
				if (item.color == 'warning') item.icon = 'mdi-alert';
				if (item.color == 'error') item.icon = 'mdi-alert-octagram';
			}
			item.duration = item.duration || 5000
			item.timeout = _.delay(this.splice, item.duration, item.id)
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


