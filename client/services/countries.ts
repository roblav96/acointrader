// 

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import lockr from 'lockr'
import pdelay from 'delay'
import axios from 'axios'



const countries = lockr.get('services.countries', [])



function syncCountries() {
	return axios.get('https://restcountries.eu/rest/v2/all').then(function({ data }) {
		let response = data.map(v => _.pick(v, ['alpha2Code', 'alpha3Code', 'name', 'topLevelDomain', 'callingCodes', 'capital', 'region', 'subregion', 'demonym', 'timezones', 'numericCode', 'currencies'])) as Array<any>
		// console.log('response', JSON.stringify(response))
		lockr.set('services.countries', response)
		response.forEach(v => countries.push(v))
		return Promise.resolve()
	}).catch(function(error) {
		console.error('syncCountries > error', error)
		return pdelay(1000).then(syncCountries)
	})
}

if (_.isEmpty(countries)) syncCountries();



export default countries




