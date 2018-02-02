//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import pall from 'p-all'
import r from '../adapters/rethinkdb'
import redis from '../adapters/redis'
import * as http from '../services/http'



declare global {
	namespace CryptoCompare {

		interface CoinListResult {
			Algorithm: string
			CoinName: string
			FullName: string
			FullyPremined: string
			Id: string
			ImageUrl: string
			Name: string
			PreMinedValue: string
			ProofType: string
			SortOrder: string
			Sponsored: boolean
			Symbol: string
			TotalCoinSupply: string
			TotalCoinsFreeFloat: string
			Url: string
		}

	}
}



export function syncCryptos(skips: string[]) {
	return Promise.resolve().then(function() {
		return Promise.all([
			r.table('assets').getAll(true, { index: 'crypto' }).getField('id').run(),
			http.get('https://www.cryptocompare.com/api/data/coinlist', null, { retry: true }),
		])

	}).then(function(resolved) {
		let cryptos = resolved[0] as string[]
		let results = resolved[1].Data as Dict<CryptoCompare.CoinListResult>

		let items = [] as Array<Items.Asset>
		Object.keys(results).forEach(function(key) {
			let result = results[key]
			if (cryptos.indexOf(result.Symbol) == -1) return;
			items.push({
				id: result.Symbol,
				logo: 'https://www.cryptocompare.com' + result.ImageUrl,
				ccId: result.Id,
			} as Items.Asset)
		})
		items = items.filter(v => !!v && shared.string.isValidSymbol(v.id) && skips.indexOf(v.id) == -1)
		items.forEach(shared.object.compact)
		return r.table('assets').insert(items, { conflict: 'update' }).run()

	}).then(function() {
		console.info('syncCryptos > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('syncCryptos > error', errors.render(error))
		return Promise.resolve(false)
	})
}


















