//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import pall from 'p-all'
import cheerio from 'cheerio'
import url from 'url'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'



export function syncExchanges() {
	return Promise.resolve().then(function() {
		return getExchangeCount()

	}).then(function(count) {
		let total = _.ceil(count / 25)
		let pages = Array.from(Array(total + 1), (v, i) => i)
		pages.unshift(-1)
		pages.push(...shared.object.clone(pages), ...shared.object.clone(pages))
		return pall(pages.map(page => () => scrapePage(page)), { concurrency: 1 })
		// return scrapePage(0)
		// return scrapeExchangeMeta({
		// 	id: 'binance',
		// 	href: 'https://coinclarity.com/exchange/binance/',
		// 	logoSquare: 'https://coinclarity.com/wp-content/uploads/2017/11/Screenshot-2017-11-17-22.50.06-280x280.png',
		// })

	}).then(function() {
		console.warn('exchanges.sync > DONE')
		return Promise.resolve(true)

	}).catch(function(error) {
		console.error('exchanges.sync > error', errors.render(error))
		return Promise.resolve(false)
	})
}



interface ExchangeMeta { id: string, href: string, logoSquare: string }

function scrapeExchangeMeta(meta: ExchangeMeta) {
	return Promise.resolve().then(function() {
		return http.scrape(meta.href)

	}).then(function(html: string) {
		let $ = cheerio.load(html)

		let $h1 = $('h1').last()
		let name = $h1.text().trim()

		let $a = $('.profile-sidebar-section a').first()
		let href = $a.attr('href')
		if (!href) href = $a.text();
		let id = shared.string.parseExchangeId(href)
		let parsed = url.parse(href)
		let website = parsed.protocol + '//' + parsed.hostname

		let year = $('.profile-sidebar-section span').last().text()
		let inaugurated = shared.string.parseInt(year)

		let description = $('blockquote').text().trim()
		if (description.charAt(description.length - 1) != '.') description += '.';

		let item = {
			id, name, website, inaugurated, description,
			logoSquare: meta.logoSquare,
			coinclarity: meta.href,
		} as Items.Exchange
		shared.object.compact(item)
		return r.table('exchanges').insert(item, { conflict: 'update' }).run()

	}).then(function() {
		return Promise.resolve(true)
	})
}



function scrapePage(page: number) {
	return Promise.resolve().then(function() {
		if (page == -1) return http.scrape('https://coinclarity.com/exchanges/');
		return http.scrape('https://coinclarity.com/exchanges/', { fwp_paged: page })

	}).then(function(html: string) {
		let metas = [] as Array<ExchangeMeta>

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

		return pall(metas.map(meta => () => scrapeExchangeMeta(meta)), { concurrency: 1 })
		// return scrapeExchangeMeta(metas[0])

	}).then(function() {
		return Promise.resolve(true)
	})
}



function getExchangeCount() {
	return Promise.resolve().then(function() {
		return http.scrape('https://coinclarity.com/exchanges/')
	}).then(function(html: string) {
		let $ = cheerio.load(html)
		let slug = $('.post-slug') // $('.top-paginator .post-count .post-slug')
		let count = shared.string.parseInt(slug.text())
		return Promise.resolve(count)
	})
}





// function saveImage(name: string, url: string) {
// 	return Promise.resolve().then(function() {
// 		return jimp.read(url)
// 	}).then(function(img) {
// 		return img.write('DOWNLOADS/' + name + '.png')
// 		// return img.resize(300, 300).write('DOWNLOADS/' + name + '.png')
// 	}).then(function() {
// 		return Promise.resolve()
// 	})
// }



















