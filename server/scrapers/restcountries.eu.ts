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



export function syncFiatAssets(): Promise<boolean> {
	return Promise.resolve().then(function() {
		return r.table('countries').run()

	}).then(function(response: RestCountries.Country[]) {
		if (response.length == 0) {
			return syncCountries().then(() => r.table('countries').run())
		}
		return Promise.resolve(response)

	}).then(function(response: RestCountries.Country[]) {

		console.log('response.length', response.length)

		let items = [] as Items.Asset[]
		response.forEach(function(country) {
			country.currencies.forEach(function(currency) {
				if (!shared.valid.symbol(currency.code)) return;
				items.push({
					symbol: currency.code,
					name: _.startCase(currency.name),
					unicode: currency.symbol,
					fiat: true,
				} as Items.Asset)
			})

			let fiats = country.currencies.map(v => v.code)
			console.log(country.name, 'fiats >')
			eyes.inspect(fiats)

		})

		_.remove(items, function(item, i) {
			if (!shared.valid.symbol(item.symbol)) return true;
			item.logo = 'https://www.coinhills.com/images/market/currency/' + item.symbol.toLowerCase() + '.svg'
			shared.object.compact(item)
			return false
		})
		
		console.log('items >')
		eyes.inspect(items)

		// return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncFiatAssets > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncFiatAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}



function syncCountries() {
	return Promise.resolve().then(function() {
		return http.get('https://restcountries.eu/rest/v2/all')
	}).then(function(response) {
		return r.table('countries').insert(response, { conflict: 'update' }).run()
	}).then(function() {
		console.info('syncCountries > DONE')
		return Promise.resolve(true)
	}).catch(function(error) {
		console.error('syncCountries > error', errors.render(error))
		return Promise.resolve(false)
	})
}












