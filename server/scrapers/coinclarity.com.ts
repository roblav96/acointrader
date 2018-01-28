//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import cheerio from 'cheerio'
import jimp from 'jimp'
import url from 'url'
import redis from '../adapters/redis'
import r from '../adapters/rethinkdb'
import * as http from '../services/http'



function scrapePage(page: number): Promise<any> {
	return Promise.resolve().then(function() {
		return http.get('https://coinclarity.com/exchanges/', {
			fwp_paged: page,
		})

	}).then(function(html: string) {
		let proms = []

		let $ = cheerio.load(html)
		let lis = $('[data-name="exchanges"] li')//.first()
		lis.each(function(i, li) {
			let $li = $(li)

			let $a = $li.children('a').first()
			let href = $a.attr('href')
			let name = _.compact(href.split('/')).pop()
			console.log('name', name)

			let srcs = $li.find('div.thumb img').attr('data-lazy-srcset')
			if (!srcs) return;
			let imgurl = srcs.split(',').map(v => v.trim().split(' ')[0]).pop()
			// console.log('imgurl', imgurl)

			proms.push(saveImage(name, imgurl))

		})

		return Promise.all(proms)

	}).then(function() {
		console.warn('DONE >', page)
		page++
		if (page <= 8) return scrapePage(page);
		return Promise.resolve()

	}).catch(function(error) {
		console.error('scrapePage > error', error)
		return Promise.resolve()
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
			return getExchangeCount()

		}).then(function(count) {
			console.log('count >')
			eyes.inspect(count)

		}).then(function() {
			return Promise.resolve(true)
		}).catch(function(error) {
			console.error('error', errors.render(error))
			return Promise.resolve(false)
		})
	},

}























