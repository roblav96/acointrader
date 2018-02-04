//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import pall from 'p-all'
import cheerio from 'cheerio'
import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from '../services/http'



declare global {
	namespace ApogeeCrypto {

		interface TickerResult {
			'24h_volume_aud': number
			'24h_volume_btc': number
			'24h_volume_usd': number
			available_supply: number
			id: string
			last_updated: number
			market_cap_aud: number
			market_cap_btc: number
			market_cap_usd: number
			name: string
			percent_change_1h: number
			percent_change_24h: number
			percent_change_7d: number
			price_aud: number
			price_btc: number
			price_usd: number
			rank: number
			symbol: string
			total_supply: number
		}

	}
}



export function syncCryptos(skips: string[]) {
	return Promise.resolve().then(function() {
		return http.get('https://www.apogeecrypto.com/api/v1/tickers', null, { retry: true })

	}).then(function(response: ApogeeCrypto.TickerResult[]) {
		let items = response.map(function(ticker) {
			return {
				symbol: ticker.symbol,
				logo: 'https://s3-ap-southeast-2.amazonaws.com/apogee-crypto-assets/logos/' + ticker.symbol.toLowerCase() + '-' + ticker.id.toLowerCase() + '.svg',
			} as Items.Asset
		})
		items = items.filter(v => !!v && shared.valid.symbol(v.symbol) && skips.indexOf(v.symbol) == -1)
		items.forEach(shared.object.compact)

		items.splice(10)
		console.log('items >')
		eyes.inspect(items)
		
		console.log('response.length', response.length)

		// return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncCryptos > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncCryptos > error', errors.render(error))
		return Promise.resolve(false)
	})
}



// export function syncCryptos(skips: string[]) {
// 	return Promise.resolve().then(function() {
// 		return http.scrape('https://www.apogeecrypto.com/', null, { retry: true })

// 	}).then(function(html: string) {
// 		let $ = cheerio.load(html)
// 		// $('nav[role] ~ div > div > div:first-child').remove()
// 		let items = [] as Array<Items.Asset>
// 		let cols = $('body nav[role="navigation"] ~ div > div:nth-child(2) > div')
// 		console.log('cols.length', cols.length)
// 		cols.each(function(i, el) {
// 			if (i == 0) return;
// 			if (i > 5) return;
// 			let $el = $(el)


// 		})
// 		// items = items.filter(v => !!v && shared.valid.symbol(v.id) && skips.indexOf(v.id) == -1)
// 		// items.forEach(shared.object.compact)
// 		// console.log('items >')
// 		// eyes.inspect(items)
// 		// return r.table('assets').insert(items, { conflict: 'update' }).run()

// 	}).then(function() {
// 		console.info('syncCoins > DONE')
// 		return Promise.resolve(true)

// 	}).catch(function(error) {
// 		console.error('syncCoins > error', errors.render(error))
// 		return Promise.resolve(false)
// 	})
// }
















