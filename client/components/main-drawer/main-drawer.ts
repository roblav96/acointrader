// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'



export class store {
	show = false
}

@Vts.Component(<VueComponent>{
	name: 'MainDrawer',
})
export default class MainDrawer extends Vue {

	created() {
		
	}

	mounted() {

	}

	beforeDestroy() {

	}



	get drawer() {
		return this.$store.state.main_drawer.show && !!this.$store.state.coinbase.api_key
	}
	set drawer(drawer: boolean) {
		this.$store.state.main_drawer.show = drawer
	}



}


