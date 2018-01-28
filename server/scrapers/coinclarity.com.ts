//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import pdelay from 'delay'
import pevent from 'p-event'
import pforever from 'p-forever'
import pqueue from 'p-queue'
import pall from 'p-all'
import cheerio from 'cheerio'
import jimp from 'jimp'
import url from 'url'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'



declare global {
	interface CoinClarityExchangeMeta {
		id: string
		href: string
		logoSquare: string
	}
}



const PAGE_LIMIT = 25



function scrapeExchangeMeta(meta: CoinClarityExchangeMeta) {
	return Promise.resolve().then(function() {
		return http.scrape(meta.href)

	}).then(function(html: string) {
		let $ = cheerio.load(html)

		let $h1 = $('h1').last()
		let name = $h1.text().trim()

		let $a = $('.profile-sidebar-section a').first()
		let href = $a.attr('href')
		let id = shared.string.parseExchangeId(href)
		let parsed = url.parse(href)
		let website = parsed.protocol + '//' + parsed.hostname

		let description = $('blockquote').text().trim()
		if (description.charAt(description.length - 1) != '.') description += '.';

		let item = { id, name, website, logoSquare: meta.logoSquare, description } as ExchangeItem
		console.log('item >')
		eyes.inspect(item)

	})
}



function scrapePage(page: number) {
	return Promise.resolve().then(function() {
		return http.scrape('https://coinclarity.com/exchanges/', {
			fwp_paged: page,
		})

	}).then(function(html: string) {
		let metas = [] as Array<CoinClarityExchangeMeta>

		let $ = cheerio.load(html)
		let lis = $('[data-name="exchanges"] li')
		lis.each(function(i, li) {
			let $li = $(li)

			let $a = $li.children('a').first()
			let href = $a.attr('href')
			let id = _.compact(href.split('/')).pop()

			let srcs = $li.find('div.thumb img').attr('data-lazy-srcset')
			if (!srcs) return;
			let logoSquare = srcs.split(',').map(v => v.trim().split(' ')[0]).pop()

			metas.push({ id, href, logoSquare })

		})

		return scrapeExchangeMeta(metas[0])
		// return pall(metas.map(meta => () => scrapeExchangeMeta(meta)), { concurrency: 1 })

	})
}



function getExchangeCount(): Promise<number> {
	return Promise.resolve().then(function() {
		return http.scrape('https://coinclarity.com/exchanges/')
	}).then(function(html: string) {
		let $ = cheerio.load(html)
		let slug = $('.post-slug') // $('.top-paginator .post-count .post-slug')
		let count = shared.string.parseInt(slug.text())
		return Promise.resolve(count)
	})
}



export const exchanges = {

	sync(): Promise<boolean> {
		return Promise.resolve().then(function() {
			// 	return getExchangeCount()

			// }).then(function(count) {
			// 	let pages = _.ceil(count / PAGE_LIMIT)
			// 	let fns = Array.from(Array(pages + 1), (v, i) => i)
			// return scrapePage(0)
			// return pall(fns.map(page => () => scrapePage(page)), { concurrency: 1 })

			return scrapeExchangeMeta({
				id: 'binance',
				href: 'https://coinclarity.com/exchange/binance/',
				logoSquare: 'https://coinclarity.com/wp-content/uploads/2017/11/Screenshot-2017-11-17-22.50.06-280x280.png',
			})

		}).then(function() {
			return Promise.resolve(true)
		}).catch(function(error) {
			console.error('exchanges.sync > error', errors.render(error))
			return Promise.resolve(false)
		})
	},

}























