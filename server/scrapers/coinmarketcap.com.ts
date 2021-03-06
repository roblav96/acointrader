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



export function syncCryptoAssets(): Promise<boolean> {
	return Promise.resolve().then(function() {
		return Promise.all([
			syncTickers(),
			syncCoins(),
			syncTokens(),
		])
	}).then(function() {
		console.info('syncCryptoAssets > DONE')
		return Promise.resolve(true)
	}).catch(function(error) {
		console.error('syncCryptoAssets > error', errors.render(error))
		return Promise.resolve(false)
	})
}



export function syncTickers(): Promise<boolean> {
	return Promise.resolve().then(function() {
		return http.get('https://api.coinmarketcap.com/v1/ticker/', { limit: -1 })

	}).then(function(response: Array<CoinMarketCap.Ticker>) {
		let items = response.map(function(ticker) {
			return {
				symbol: ticker.symbol,
				name: ticker.name,
				crypto: true,
				logo: 'http://s3-ap-southeast-2.amazonaws.com/apogee-crypto-assets/logos/' + ticker.symbol.toLowerCase() + '-' + ticker.id.toLowerCase() + '.svg',
				availableSupply: Number.parseFloat(ticker.available_supply),
				totalSupply: Number.parseFloat(ticker.total_supply),
				maxSupply: Number.parseFloat(ticker.max_supply),
			} as Items.Asset
		})

		_.remove(items, function(item, i) {
			if (!shared.valid.symbol(item.symbol)) return true;
			shared.object.compact(item)
			return false
		})
		
		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncTickers > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncTickers > error', errors.render(error))
		return Promise.resolve(false)
	})
}



export function syncCoins(): Promise<boolean> {
	return Promise.resolve().then(function() {
		return http.scrape('https://coinmarketcap.com/coins/views/all/')

	}).then(function(html: string) {
		let $ = cheerio.load(html)
		let items = [] as Array<Items.Asset>
		$('table.table > tbody > tr').each(function(i, el) {
			let $el = $(el)
			let symbol = $el.find('.col-symbol').text().trim()
			let supply = $el.find('.circulating-supply').text().trim()
			items.push({
				symbol, coin: true, mineable: supply.indexOf('*') == -1,
			} as Items.Asset)
		})

		_.remove(items, function(item, i) {
			if (!shared.valid.symbol(item.symbol)) return true;
			shared.object.compact(item)
			return false
		})
		
		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncCoins > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncCoins > error', errors.render(error))
		return Promise.resolve(false)
	})
}



export function syncTokens(): Promise<boolean> {
	return Promise.resolve().then(function() {
		return http.scrape('https://coinmarketcap.com/tokens/views/all/')

	}).then(function(html: string) {
		let $ = cheerio.load(html)
		let items = [] as Array<Items.Asset>
		$('table.table > tbody > tr').each(function(i, el) {
			let platform = el.attribs['data-platformsymbol'].trim()
			let $el = $(el)
			let symbol = $el.find('.currency-symbol').text().trim()
			items.push({
				symbol, token: platform,
			} as Items.Asset)
		})

		_.remove(items, function(item, i) {
			if (!shared.valid.symbol(item.symbol)) return true;
			shared.object.compact(item)
			return false
		})
		
		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncTokens > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncTokens > error', errors.render(error))
		return Promise.resolve(false)
	})
}
















