// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from './http'
import * as ledger from './ledger'
import * as yahoo from '../scrapers/yahoo.com'
import * as localbitcoins from '../scrapers/localbitcoins.com'
import * as restcountries from '../scrapers/restcountries.eu'



export function preAssets(): Promise<void> {
	return Promise.resolve().then(function() {
		return r.table('assets').filter(r.row('fiat').eq(true)).count().run()
	}).then(function(count: number) {
		if (process.DEVELOPMENT && count > 0) return Promise.resolve();
		return sync()
	})
}



export function sync(): Promise<void> {
	return Promise.resolve().then(function() {
		return Promise.all([
			restcountries.getFiatAssets(),
			localbitcoins.getFiatAssets(),
		])

	}).then(function(resolved) {
		let items = [
			{ symbol: 'XAU', name: 'Gold Ounce', fiat: true, commodity: true },
			{ symbol: 'XAG', name: 'Silver Ounce', fiat: true, commodity: true },
			{ symbol: 'XPT', name: 'Platinum Ounce', fiat: true, commodity: true },
			{ symbol: 'XPD', name: 'Palladium Ounce', fiat: true, commodity: true },
		] as Items.Asset[]
		items.push(..._.flatten(resolved))
		items.push({ symbol: 'CNH', name: 'Chinese Yuan Offshore', fiat: true } as Items.Asset)
		items = _.uniqBy(items, 'symbol')

		_.remove(items, function(item, i) {
			if (!shared.valid.symbol(item.symbol)) return true;
			item.logo = 'https://www.coinhills.com/images/market/currency/' + item.symbol.toLowerCase() + '.svg'
			shared.object.compact(item)
			return false
		})

		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		return r.table('assets').filter(r.row('fiat').eq(true)).run()

	}).then(function(items: Items.Asset[]) {
		return ledger.insertAssets(items)

	}).catch(function(error) {
		console.error('sync > error', errors.render(error))
	})
}
















