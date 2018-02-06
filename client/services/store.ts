// 

import Vuex, { Store } from 'vuex'
import _ from 'lodash'
import * as shared from '../../shared/shared'
import * as utils from './utils'
import * as security from './security'
import * as user from './user'



class State {

	blockui = true

	security = security.state
	user = user.state

}
declare global { type StoreState = State }



export const store = new Vuex.Store<State>({
	strict: false,
	state: new State(),
	plugins: [],
	getters: {

	}
})

// console.log('store.state', store.state)









