// 

import _ from 'lodash'
import axios from 'axios'
import * as shared from '../../shared/shared'
import * as utils from './utils'
import * as security from './security'



axios.defaults.timeout = 10000

function request(config: HttpRequestConfig): Promise<any> {
	return Promise.resolve().then(function() {

		if (!config.headers) config.headers = {};
		if (!_.isFinite(config.timeout)) config.timeout = axios.defaults.timeout;

		let silent = config.silent == true || process.PRODUCTION
		if (silent != true) console.log('%c▶ ' + config.method + ' ' + (config.production ? 'https://acointrader.com/api' + config.url : config.url) + ' ▶', 'font-weight: 300;', _.truncate(JSON.stringify(config.params || config.data || {}), { length: 64 }));



		let isproxy = config.url[0] != '/'
		let proxyconfig = isproxy ? utils.clone(config) : null

		if (!config.params) config.params = {};
		if (config.silent == true) config.params.silent = true;

		let domain = config.production ? 'https://acointrader.com' : process.$domain
		config.baseURL = domain + '/api'

		Object.assign(config.headers, security.getHeaders(), {
			'x-version': process.$version,
			'x-platform': 'web',
		})
		shared.object.compact(config.headers)

		if (isproxy) {
			// config.baseURL = 'https://acointrader.com/api'
			config.url = '/proxy'
			config.data = proxyconfig
			config.method = 'POST'
		}

		return axios.request(config).then(function({ data }) {
			return Promise.resolve(data)
		})

	}).catch(function(error) {
		let message = error.message
		if (_.has(error, 'response.data.message')) message = error.response.data.message;
		let premessage = '[' + config.method + '] /api' + config.url
		console.log('%c◀ ' + premessage + ' ◀', 'color: red; font-weight: bolder;', message)
		// Snackbar.push({ message: premessage + ' > ' + message, color: 'error' })
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


















