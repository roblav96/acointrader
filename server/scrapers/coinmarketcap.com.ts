//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import pall from 'p-all'
import cheerio from 'cheerio'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'



declare global {
	namespace CoinMarketCap {

		interface SearchResult {
			name: string
			rank: number
			slug: string
			symbol: string
			tokens: Array<string>
		}

		interface Ticker {
			'24h_volume_usd': string
			available_supply: string
			id: string
			last_updated: string
			market_cap_usd: string
			max_supply: string
			name: string
			percent_change_1h: string
			percent_change_24h: string
			percent_change_7d: string
			price_btc: string
			price_usd: string
			rank: string
			symbol: string
			total_supply: string
		}

	}
}



export function syncAssets() {
	return pall([
		() => syncTickers(),
		() => syncCoins(),
		() => syncTokens(),
	], { concurrency: 1 }).then(function() {
		console.info('syncAssets > DONE')
		return Promise.resolve(true)
	}).catch(function(error) {
		console.error('syncAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}



export function syncTickers() {
	return Promise.resolve().then(function() {
		return http.get('https://api.coinmarketcap.com/v1/ticker/', {
			limit: -1,
		}, { retry: true })

	}).then(function(response: Array<CoinMarketCap.Ticker>) {
		let items = response.map(function(ticker) {
			return {
				id: ticker.symbol,
				slug: ticker.id,
				name: ticker.name,
				crypto: true,
				availableSupply: Number.parseFloat(ticker.available_supply),
				totalSupply: Number.parseFloat(ticker.total_supply),
				maxSupply: Number.parseFloat(ticker.max_supply),
			} as Items.Asset
		}).filter(v => shared.string.isValidSymbol(v.id))
		items.forEach(shared.object.compact)
		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncTickers > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncTickers > error', errors.render(error))
		return Promise.resolve(false)
	})
}



export function syncCoins() {
	return Promise.resolve().then(function() {
		return http.scrape('https://coinmarketcap.com/coins/views/all/', null, { retry: true })

	}).then(function(html: string) {
		let $ = cheerio.load(html)
		let items = [] as Array<Items.Asset>
		$('table.table > tbody > tr').each(function(i, el) {
			let $el = $(el)
			let symbol = $el.find('.col-symbol').text().trim()
			let supply = $el.find('.circulating-supply').text().trim()
			items.push({
				id: symbol,
				coin: true,
				mineable: supply.indexOf('*') == -1,
			} as Items.Asset)
		})
		items = items.filter(v => shared.string.isValidSymbol(v.id))
		items.forEach(shared.object.compact)
		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncCoins > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncCoins > error', errors.render(error))
		return Promise.resolve(false)
	})
}



export function syncTokens() {
	return Promise.resolve().then(function() {
		return http.scrape('https://coinmarketcap.com/tokens/views/all/', null, { retry: true })

	}).then(function(html: string) {
		let $ = cheerio.load(html)
		let items = [] as Array<Items.Asset>
		$('table.table > tbody > tr').each(function(i, el) {
			let symbol = el.attribs['data-platformsymbol'].trim()
			let $el = $(el)
			let href = $el.find('.platform-name a').attr('href')
			let platform = _.compact(href.split('/')).pop()
			items.push({
				id: symbol,
				token: platform,
			} as Items.Asset)
		})
		items = items.filter(v => shared.string.isValidSymbol(v.id))
		items.forEach(shared.object.compact)
		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncTokens > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncTokens > error', errors.render(error))
		return Promise.resolve(false)
	})
}
















