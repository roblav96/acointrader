//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from '../services/http'
import * as assets from '../services/assets'



export function getFiatAssets(): Promise<Items.Asset[]> {
	return Promise.resolve().then(function() {
		return getCountries()

	}).then(function(countries) {

		let items = [] as Items.Asset[]
		countries.forEach(function(country) {
			country.currencies.forEach(function(currency) {
				if (!shared.valid.symbol(currency.code)) return;
				if (items.findIndex(v => v.symbol == currency.code) >= 0) return;
				items.push({
					symbol: currency.code,
					name: _.startCase(currency.name),
					fiat: true,
				} as Items.Asset)
			})
		})

		return Promise.resolve(items)

	}).catch(function(error) {
		console.error('getFiatAssets > error', errors.render(error))
		return Promise.resolve([])
	})
}



function getCountries(): Promise<RestCountries.Country[]> {
	return Promise.resolve().then(function() {
		return r.table('countries').run()
	}).then(function(response: RestCountries.Country[]) {
		if (response.length == 0) return rCountriesSync().then(() => r.table('countries').run());
		return Promise.resolve(response)
	})
}

function rCountriesSync(): Promise<void> {
	return Promise.resolve().then(function() {
		return http.get('https://restcountries.eu/rest/v2/all')
	}).then(function(response) {
		return r.table('countries').insert(response, { conflict: 'update' }).run()
	}).catch(function(error) {
		console.error('rCountriesSync > error', errors.render(error))
	})
}







declare global {
	namespace RestCountries {

		interface Country {
			alpha2Code: string
			alpha3Code: string
			altSpellings: string[]
			area: number
			borders: string[]
			callingCodes: string[]
			capital: string
			cioc: string
			currencies: {
				code: string
				name: string
				symbol: string
			}[]
			demonym: string
			flag: string
			gini: number
			languages: {
				iso639_1: string
				iso639_2: string
				name: string
				nativeName: string
			}[]
			latlng: number[]
			name: string
			nativeName: string
			numericCode: string
			population: number
			region: string
			regionalBlocs: {
				acronym: string
				name: string
				otherAcronyms: any[]
				otherNames: any[]
			}[]
			subregion: string
			timezones: string[]
			topLevelDomain: string[]
			translations: {
				br: string
				de: string
				es: string
				fa: string
				fr: string
				hr: string
				it: string
				ja: string
				nl: string
				pt: string
			}
		}

	}
}












