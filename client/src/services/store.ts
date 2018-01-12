// 

import Vue from 'vue'
import Vuex from 'vuex'



class State {



}
declare global { type StoreState = State }

export const store = new Vuex.Store<State>({
	strict: false,
	state: new State(),
})


