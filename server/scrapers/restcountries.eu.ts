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
		return http.get('https://restcountries.eu/rest/v2/all')

	}).then(function(response: RestCountries.Country[]) {
		
		let items = [] as Items.Asset[]
		response.forEach(function(country) {
			country.currencies.forEach(function(currency) {
				if (!shared.valid.symbol(currency.code)) return;

				let item = {
					symbol: currency.code,
					name: _.startCase(currency.name),
					fiat: true
				} as Items.Asset
				
				items.push(item)

			})
			// let fiats = result.currencies.map(v => v.code)

		})

		_.remove(items, function(item, i) {
			if (!shared.valid.symbol(item.symbol)) return true;
			item.logo = 'https://www.coinhills.com/images/market/currency/' + item.symbol.toLowerCase() + '.svg'
			shared.object.compact(item)
			return false
		})

		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncFiatAssets > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncFiatAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}




export function syncFiatAssets() {
	// r.db('acointrader').table('assets').filter(r.row('fiat').eq(true).and(r.row('coin').eq(true)))
	return Promise.resolve().then(function() {
		return r.table('countries').count().run()

	}).then(function(count: number) {
		if (!!count) return Promise.resolve(true);
		return syncCountries()

	}).then(function() {
		return r.table('countries').run()

	}).then(function(results: Array<RestCountries.Country>) {

		let items = [] as Array<Items.Asset>
		results.forEach(function(result) {
			result.currencies.forEach(function(currency) {
				// if (!currency.code || !shared.valid.symbol(currency.code)) return;
				// if (assets.FIATS.indexOf(currency.code) == -1) return;

				let item = {
					symbol: currency.code,
					name: _.startCase(currency.name),
					fiat: true
				} as Items.Asset
				
				items.push(item)

			})
			// let fiats = result.currencies.map(v => v.code)


			// currencies.push(...fiats)
		})
		// currencies = _.uniq(currencies)
		// currencies = currencies.filter(v => !!v && shared.valid.symbol(v))
		// currencies.sort()

		// console.log('currencies >')
		// eyes.inspect(currencies)
		// console.log('currencies.length', currencies.length)

		// return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.warn('syncFiats > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncFiats > error', errors.render(error))
		return Promise.resolve(false)
	})
}



// export function syncCountries() {
// 	return Promise.resolve().then(function() {
// 		return http.get('https://restcountries.eu/rest/v2/all')
// 	}).then(function(response) {
// 		return r.table('countries').insert(response, { conflict: 'update' }).run()
// 	}).then(function() {
// 		console.info('syncCountries > DONE')
// 		return Promise.resolve(true)
// 	}).catch(function(error) {
// 		console.error('syncCountries > error', errors.render(error))
// 		return Promise.resolve(false)
// 	})
// }












