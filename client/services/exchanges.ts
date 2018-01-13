// 

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import lockr from 'lockr'



export class ExchangeBuilder {

	api_key = { id: '', key: '', secret: '' }

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

export class Gdax extends ExchangeBuilder {

}

export class HitBTC extends ExchangeBuilder {

}

export class Bitstamp extends ExchangeBuilder {

}

export class Gemini extends ExchangeBuilder {

}

export class Kucoin extends ExchangeBuilder {

}

export class Liqui extends ExchangeBuilder {

}

export class Gateio extends ExchangeBuilder {

}

export class CoinsBank extends ExchangeBuilder {

}

export class YoBit extends ExchangeBuilder {

}

export class CexIO extends ExchangeBuilder {

}

export class Tidex extends ExchangeBuilder {

}

export class CoinExchange extends ExchangeBuilder {

}

export class Exmo extends ExchangeBuilder {

}

export class Cryptopia extends ExchangeBuilder {

}

export class LiveCoin extends ExchangeBuilder {

}

export class Bittrex extends ExchangeBuilder {

}

export class Kraken extends ExchangeBuilder {

}



export const exchanges = [
	new Coinbase('coinbase', 'Coinbase', 'https://www.coinbase.com'),
	new Binance('binance', 'Binance', 'https://www.binance.com'),
	new Huobi('huobipro', 'Huobi Pro', 'https://www.huobi.pro'),
	new Poloniex('poloniex', 'Poloniex', 'https://poloniex.com'),
	new Gdax('gdax', 'GDAX', 'https://www.gdax.com'),
	new HitBTC('hitbtc', 'HitBTC', '____'),
	new Bitstamp('bitstamp', 'Bitstamp', '____'),
	new Gemini('gemini', 'Gemini', '____'),
	new Kucoin('kucoin', 'Kucoin', '____'),
	new Liqui('liqui', 'Liqui', '____'),
	new Gateio('gateio', 'Gate.io', '____'),
	new CoinsBank('coinsbank', 'CoinsBank', '____'),
	new YoBit('yobit', 'YoBit', '____'),
	new CexIO('cexio', 'Cexio', '____'),
	new Tidex('tidex', 'Tidex', '____'),
	new CoinExchange('coinexchange', 'CoinExchange', '____'),
	new Exmo('exmo', 'Exmo', '____'),
	new Cryptopia('cryptopia', 'Cryptopia', '____'),
	new LiveCoin('livecoin', 'Livecoin', '____'),
	new Bittrex('bittrex', 'Bittrex', '____'),
	new Kraken('kraken', 'Kraken', '____'),
] as Array<ExchangeBuilder>

// console.log('exchanges', exchanges)









