// 

import Vue, { ComponentOptions, WatchOptions, FunctionalComponentOptions } from 'vue'
import * as VueRouter from 'vue-router'
import * as Vuex from 'vuex'
import * as Vts from 'vue-property-decorator'
import * as Avts from 'av-ts'



declare global {
	
	interface RouteConfig extends VueRouter.RouteConfig {
		dname?: string
		icon?: string
		mmenu?: boolean
	}

	interface VueComponent extends ComponentOptions<Vue> { }

	interface VueHeaderItem {
		key: string
		text: string
		sortable: boolean
	}
	
	interface VueLocation extends VueRouter.Location { }
	interface VueRoute extends VueRouter.Route { }
	type VueRouteNext = (to?: VueRouter.RawLocation | false | ((vm: Vue) => any) | void) => void

	interface VueTableHeader {
		text: string
		align: string
		sortable: boolean
		value: string
	}
	interface VueTablePagination {
		sortBy: string
		descending: boolean
		page: number
		rowsPerPage: number
		totalItems: number
	}

	interface BottomTabItem {
		id: string
		dname: string
		icon: string
		component: VueComponent
	}

}



declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		store?: Vuex.Store<StoreState>
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$store: Vuex.Store<StoreState>
	}
	interface VueConstructor {
		options: ComponentOptions<Vue>
	}
}

declare module 'vue-property-decorator' {
	function Watch(path: string, options?: WatchOptions): MethodDecorator & PropertyDecorator
}

declare module 'av-ts' {
	type VClass<T extends Vue> = {
		new(): T
		extend(option: ComponentOptions<Vue> | FunctionalComponentOptions): typeof Vue
	}
	function Mixin<T extends Vue>(parent: typeof Vue, ...traits: (typeof Vue)[]): VClass<T>
}







