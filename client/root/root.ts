// 

import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'
import Vue from 'vue'
import _ from 'lodash'



@Vts.Component(<VueComponent>{
	name: 'Root',
} as any)
export default class Root extends Vue {

	created() {

	}

	initing = true
	mounted() {
		_.delay(() => this.initing = false, 100)
		_.delay(() => this.initing = null, 1000)
	}

	beforeDestroy() {

	}



}


