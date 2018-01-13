// 

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import lockr from 'lockr'



// declare global {
// 	interface ExchangeApiKey {
// 		id: string, key: string, secret: string
// 	}
// }



export class ExchangeBuilder {

	api_key = { id: '', key: '', secret: '' } // as ExchangeApiKey

	constructor(
		public id: string,
		public dname: string,
		public url: string,
	) {
		this.api_key.id = this.id
	}

	getQuote() {
		return { some: 'data' }
	}

}



export class Coinbase extends ExchangeBuilder {



}



export class Binance extends ExchangeBuilder {



}



export class Huobi extends ExchangeBuilder {



}



export class Poloniex extends ExchangeBuilder {



}



export const exchanges = [

	new Coinbase('coinbase', 'Coinbase', 'https://www.coinbase.com'),

	new Binance('binance', 'Binance', 'https://www.binance.com'),

	new Huobi('huobi', 'Huobi.Pro', 'https://www.huobi.pro'),

	new Poloniex('poloniex', 'Poloniex', 'https://poloniex.com'),

] as Array<ExchangeBuilder>

// console.log('exchanges', exchanges)







// export class store {
// 	coinbase = new ExchangeBuilder('coinbase', 'Coinbase', 'https://www.coinbase.com/')
// 	binance = { api_key: '', api_secret: '' }
// 	huobi = { api_key: '', api_secret: '' }
// 	poloniex = { api_key: '', api_secret: '' }
// 	gdax = { api_key: '', api_secret: '' }
// 	hitbtc = { api_key: '', api_secret: '' }
// 	bitstamp = { api_key: '', api_secret: '' }
// 	gemini = { api_key: '', api_secret: '' }
// 	kucoin = { api_key: '', api_secret: '' }
// 	liqui = { api_key: '', api_secret: '' }
// 	gateio = { api_key: '', api_secret: '' }
// 	coinsbank = { api_key: '', api_secret: '' }
// 	yobit = { api_key: '', api_secret: '' }
// 	cexio = { api_key: '', api_secret: '' }
// 	tidex = { api_key: '', api_secret: '' }
// 	coinexchange = { api_key: '', api_secret: '' }
// }


