// 

import Vue from 'vue'
import Vuex from 'vuex'



export class ExchangeBuilder {

	id = ''
	dname = ''
	url = ''
	logo = ''

	api_key = { id: '', key: '', secret: '' }
	
	constructor() {
		console.log('this', JSON.stringify(this, null, 4))
	}
	
	getQuote() {
		return { some: 'data' }
	}

}



export class Coinbase extends ExchangeBuilder {

	id = 'coinbase'
	dname = 'Coinbase'
	url = 'https://www.coinbase.com/'

}



export const exchanges = [
	new Coinbase()
] as Array<ExchangeBuilder>







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


