// 

import * as eyes from 'eyes'
import * as clc from 'cli-color'
import * as _ from 'lodash'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import url from 'url'
import axios from 'axios'
import pevent from 'p-event'



axios.defaults.timeout = 10000

function request(config: HttpRequestConfig): Promise<any> {
	let cached = config.retry ? shared.object.clone(config) : null
	return Promise.resolve().then(function() {

		let parsed = url.parse(config.url)

		if (!Number.isFinite(config.timeout)) config.timeout = axios.defaults.timeout;

		let silent = process.PRODUCTION || config.silent == true
		if (silent != true) console.info('▶ ' + config.method + ' ' + config.url + ' ▶', _.truncate(JSON.stringify(config.params || config.data || {}), { length: 64 }));

		if (_.isEmpty(config.headers)) config.headers = {};
		Object.assign(config.headers, {
			'Accept': '*/*',
			'Accept-Encoding': 'deflate, gzip',
			'Host': parsed.host,
			// 'Connection': 'keep-alive',
		})

		if (config.scraper) {
			config.headers['User-Agent'] = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)'
		}

		return axios.request(config).then(function(response) {
			return Promise.resolve(response.data)
		})

	}).catch(function(error) {
		if (config.retry && errors.isTimeout(error)) {
			return pevent(process.EE3, shared.EE3.TICK_3).then(function() {
				return request(cached)
			})
		}
		return Promise.reject(error)
	})

}

export function get<T = any>(url: string, params?: any, config = {} as HttpRequestConfig) {
	config.url = url
	config.method = 'GET'
	if (params) config.params = params;
	return request(config) as Promise<T>
}

export function post<D = any, T = any>(url: string, data?: D, config = {} as HttpRequestConfig) {
	config.url = url
	config.method = 'POST'
	if (data) config.data = data;
	return request(config) as Promise<T>
}

export function scrape<T = any>(url: string, params?: any, config = {} as HttpRequestConfig) {
	config.scraper = true
	return get(url, params, config) as Promise<T>
}




