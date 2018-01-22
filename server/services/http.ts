// 

import eyes from 'eyes'
import clc from 'cli-color'
import _ from 'lodash'
import moment from 'moment'
import * as errors from './errors'
import * as shared from '../../shared/shared'
import * as utils from './utils'

import { parse as parseUrl } from 'url'
import axios from 'axios'



axios.defaults.timeout = 10000

function request(config: HttpRequestConfig): Promise<any> {
	return Promise.resolve().then(function() {

		let parsed = parseUrl(config.url)

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

		return axios.request(config).then(function({ data }) {
			return Promise.resolve(data)
		})

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




