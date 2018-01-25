//

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import * as errors from '../services/errors'
import * as utils from '../services/utils'
import * as shared from '../../shared/shared'

import cheerio from 'cheerio'
import jimp from 'jimp'
import axios from 'axios'



function saveImage(name: string, url: string) {
	return Promise.resolve().then(function() {
		return jimp.read(url)
	}).then(function(img) {
		return img.write('DOWNLOADS/' + name + '.png')
	}).then(function() {
		return Promise.resolve()
	})
}

function scrapePage(page = 0) {
	return Promise.resolve().then(function() {
		return axios.get('https://coinclarity.com/exchanges/?fwp_paged=' + page)
	}).then(function({ data }) {
		let proms = []

		let $ = cheerio.load(data)
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
			console.log('imgurl', imgurl)

			proms.push(saveImage(name, imgurl))

		})

		return Promise.all(proms)

	}).then(function() {
		console.warn('DONE >', page)
		return scrapePage(page + 1)

	}).catch(function(error) {
		console.error('scrapePage > error', error)
		return Promise.resolve()
	})
}

// scrapePage()





