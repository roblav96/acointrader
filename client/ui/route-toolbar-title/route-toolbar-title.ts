// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'



@Vts.Component(<VueComponent>{
	name: 'RouteToolbarTitle',
})
export default class RouteToolbarTitle extends Vue {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



	get main_drawer() { return this.$store.state.main_drawer }
	
	toggle() {
		this.main_drawer.show = !this.main_drawer.show
	}



}


