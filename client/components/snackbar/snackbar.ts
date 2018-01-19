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
		let i = Snackbar.state.items.findIndex(v => v.message == item.message)
		if (i >= 0) item = Object.assign(Snackbar.state.items.splice(i, 1), item);
		Snackbar.state.items.push(item)
	}

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



	get items() { return this.$store.state.snackbar.items }
	@Vts.Watch('items') w_items(items: Array<SnackbarItem>) {
		items.forEach(item => {
			if (Number.isFinite(item.timeout)) return;
			item.id = utils.randomBytes(8)
			item.color = item.color || ((this.$root as any).theme == 'light' ? 'secondary' : 'accent')
			if (!item.icon) {
				if (item.color == 'success') item.icon = 'mdi-checkbox-marked-circle';
				if (item.color == 'warning') item.icon = 'mdi-alert';
				if (item.color == 'error') item.icon = 'mdi-alert-octagram';
			}
			item.duration = item.duration || 3000
			item.timeout = _.delay(this.splice, item.duration, item.id)
		})
	}

	splice(id: string) {
		let i = this.items.findIndex(v => v.id == id)
		if (i == -1) return;
		let item = this.items[i]
		clearTimeout(item.timeout)
		this.items.splice(i, 1)
	}

	onmouseenter(id: string) {
		let item = this.items.find(v => v.id == id)
		if (!item) return;
		clearTimeout(item.timeout)
	}

}


