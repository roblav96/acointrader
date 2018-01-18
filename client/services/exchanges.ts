// 

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import lockr from 'lockr'
import * as utils from './utils'



declare global {
	interface ExchangeApiKey {
		id: string
		key: string
		secret: string
		passphrase: string
	}
	interface ExchangeMarketData {

	}
	interface ExchangeAccount {

	}
}



export class ExchangeMetadata {

	id: string
	name: string
	countryCode: string
	website: string
	settingsUrl: string

	constructor(metadata: ExchangeMetadata) { Object.assign(this, metadata) }

	getMeta() { return <any>_.pick(this, Object.keys(this)) as ExchangeBuilder }

}



export class ExchangeBuilder extends ExchangeMetadata {

	index: number
	getSteps?(): Array<string>

	connectable = true
	apiKey = { key: null, secret: null } as ExchangeApiKey

	market = {

	} as ExchangeMarketData

	account = {

	} as ExchangeAccount

	constructor(metadata: ExchangeMetadata) {
		super(metadata)
		this.apiKey.id = this.id
		this.loadApiKey()
	}

	loadApiKey() {
		let apiKey = lockr.get('exchanges.' + this.id + '.apiKey', {} as ExchangeApiKey)
		Object.assign(this.apiKey, apiKey)
		if (process.$webpack[this.id]) Object.assign(this.apiKey, process.$webpack[this.id]);
	}

	saveApiKey(apiKey: ExchangeApiKey) {
		Object.assign(this.apiKey, apiKey)
		lockr.set('exchanges.' + this.id + '.apiKey', apiKey)
	}

	deleteApiKey() {
		Object.keys(this.apiKey).forEach(key => {
			if (key == 'id') return;
			this.apiKey[key] = null
		})
		lockr.rm('exchanges.' + this.id + '.apiKey')
	}



}



export class Coinbase extends ExchangeBuilder {

	getSteps() {
		return [
			`In the <code>API Access</code> tab, under the <code>API Keys</code> section, click the <code>+ New API Key</code> button`,
			`In the <code>Accounts</code> section, click the <code>all</code> checkbox`,
			`In the <code>Permissions</code> section, at the bottom of <code>API v2 permissions</code> click <code>Select all</code>`,
			`
			In the <code>Notifications</code> section, set the <code>Notification URL</code> to <code class="red--text">https://acointrader.com/api/coinbase/notifications</code><br>
			In the <code>Security settings</code> section, set the <code>Allowed IP Addresses</code> to <code class="red--text">192.34.85.234</code><br>
			Click the <code>Create</code> button
			`,
		]
	}

}

export class Gdax extends ExchangeBuilder {

	constructor(metadata: ExchangeMetadata) {
		super(metadata)
		if (this.apiKey.passphrase === undefined) this.apiKey.passphrase = null;
	}

	getSteps() {
		return [
			`
			In the <code>Permissions</code> section, select the checkboxes as shown below<br>
			Input a <code>Passphrase</code> or use the one pre-filled<br>
			Set the <code>IP Whitelist</code> to <code class="red--text">192.34.85.234</code><br>
			Click the <code>Create API Key</code> button
			`,
		]
	}

}

export class Binance extends ExchangeBuilder {

	getSteps() {
		return [
			`
			Set the <code>API key label</code> to <code class="red--text">acointrader</code><br>
			Click the <code>Create New Key</code> button
			`,
			`Click the <code>Edit</code> button`,
			`
			In the <code>Option</code> section, select all the checkboxes as shown below<br>
			In the <code>IP Access Restriction</code> section, select <code>Restrict access to trusted IPs only</code><br>
			Set the <code>Trusted IPs</code> to <code class="red--text">192.34.85.234</code><br>
			Click the <code>Save</code> button
			`,
		]
	}

}

export class HitBTC extends ExchangeBuilder {

	getSteps() {
		return [
			`Click the <code>New API Key</code> button`,
			`In the <code>Access Rights</code> column, select all checkboxes as shown below`,
		]
	}

}

export class KuCoin extends ExchangeBuilder {

	getSteps() {
		return [
			`Click the <code>Create</code> button`,
		]
	}

}

export class Bitfinex extends ExchangeBuilder {

	connectable = false

}

export class Bittrex extends ExchangeBuilder {

	connectable = false

}



export const exchanges = [

	new Coinbase({
		id: 'coinbase',
		name: 'Coinbase',
		countryCode: 'US',
		website: 'https://www.coinbase.com',
		settingsUrl: 'https://www.coinbase.com/settings/api', // #add_new_key',
	} as ExchangeMetadata),

	new Gdax({
		id: 'gdax',
		name: 'GDAX',
		countryCode: 'US',
		website: 'https://www.gdax.com',
		settingsUrl: 'https://www.gdax.com/settings/api',
	} as ExchangeMetadata),

	new Binance({
		id: 'binance',
		name: 'Binance',
		countryCode: 'HK',
		website: 'https://www.binance.com',
		settingsUrl: 'https://www.binance.com/userCenter/createApi.html',
	} as ExchangeMetadata),

	new HitBTC({
		id: 'hitbtc',
		name: 'HitBTC',
		countryCode: 'DK',
		website: 'https://hitbtc.com',
		settingsUrl: 'https://hitbtc.com/settings/api-keys',
	} as ExchangeMetadata),

	new KuCoin({
		id: 'kucoin',
		name: 'KuCoin',
		countryCode: 'HK',
		website: 'https://www.kucoin.com',
		settingsUrl: 'https://www.kucoin.com/#/user/setting/api',
	} as ExchangeMetadata),

	new Bitfinex({
		id: 'bitfinex',
		name: 'Bitfinex',
		countryCode: 'HK',
		website: 'https://www.bitfinex.com',
		settingsUrl: 'https://www.bitfinex.com/api',
	} as ExchangeMetadata),

	new Bittrex({
		id: 'bittrex',
		name: 'Bittrex',
		countryCode: 'US',
		website: 'https://bittrex.com',
		settingsUrl: 'https://bittrex.com',
	} as ExchangeMetadata),

] as Array<ExchangeBuilder>

exchanges.forEach((v, i) => v.index = i)

console.log('exchanges', exchanges)







// export class Coinbase extends ExchangeBuilder {

// }

// export class Gdax extends ExchangeBuilder {

// }

// export class Binance extends ExchangeBuilder {

// }

// export class Bitfinex extends ExchangeBuilder {

// }

// export class Bittrex extends ExchangeBuilder {

// }

// export class Huobi extends ExchangeBuilder {

// }

// export class Poloniex extends ExchangeBuilder {

// }

// export class Okex extends ExchangeBuilder {

// }

// export class HitBTC extends ExchangeBuilder {

// }

// export class Bitstamp extends ExchangeBuilder {

// }

// export class Gemini extends ExchangeBuilder {

// }

// export class Kucoin extends ExchangeBuilder {

// }

// export class Liqui extends ExchangeBuilder {

// }

// export class Gate extends ExchangeBuilder {

// }

// export class CoinsBank extends ExchangeBuilder {

// }

// export class YoBit extends ExchangeBuilder {

// }

// export class Cex extends ExchangeBuilder {

// }

// export class Tidex extends ExchangeBuilder {

// }

// export class CoinExchange extends ExchangeBuilder {

// }

// export class Exmo extends ExchangeBuilder {

// }

// export class Cryptopia extends ExchangeBuilder {

// }

// export class LiveCoin extends ExchangeBuilder {

// }

// export class Kraken extends ExchangeBuilder {

// }

// export class Coss extends ExchangeBuilder {

// }

// export class Quoinex extends ExchangeBuilder {

// }

// export class Qryptos extends ExchangeBuilder {

// }

// export class BitQuick extends ExchangeBuilder {

// }

// export class Korbit extends ExchangeBuilder {

// }

// export class Bithumb extends ExchangeBuilder {

// }

// // export class ____ extends ExchangeBuilder {

// // }



// // export const exchanges = [
// // 	new Coinbase('coinbase', 'Coinbase', 'https://www.coinbase.com'),
// // 	new Gdax('gdax', 'GDAX', 'https://www.gdax.com'),
// // 	new Binance('binance', 'Binance', 'https://www.binance.com'),
// // 	new Bitfinex('bitfinex', 'Bitfinex', 'https://www.bitfinex.com'),
// // 	new Bittrex('bittrex', 'Bittrex', 'https://bittrex.com'),
// // 	new Huobi('huobipro', 'Huobi Pro', 'https://www.huobi.pro'),
// // 	new Poloniex('poloniex', 'Poloniex', 'https://poloniex.com'),
// // 	new Okex('okex', 'OKEx', 'https://www.okex.com'),
// // 	new HitBTC('hitbtc', 'HitBTC', 'https://hitbtc.com'),
// // 	new Bitstamp('bitstamp', 'Bitstamp', 'https://www.bitstamp.net'),
// // 	new Gemini('gemini', 'Gemini', 'https://gemini.com'),
// // 	new Kucoin('kucoin', 'Kucoin', 'https://www.kucoin.com'),
// // 	new Liqui('liqui', 'Liqui', 'https://liqui.io'),
// // 	new Gate('gateio', 'Gate.io', 'https://gate.io'),
// // 	new CoinsBank('coinsbank', 'CoinsBank', 'https://coinsbank.com'),
// // 	new YoBit('yobit', 'YoBit', 'https://yobit.net/en'),
// // 	new Cex('cexio', 'CEX.io', 'https://cex.io'),
// // 	new Tidex('tidex', 'Tidex', 'https://tidex.com'),
// // 	new CoinExchange('coinexchange', 'CoinExchange', 'https://www.coinexchange.io'),
// // 	new Exmo('exmo', 'EXMO', 'https://exmo.com'),
// // 	new Cryptopia('cryptopia', 'Cryptopia', 'https://www.cryptopia.co.nz'),
// // 	new LiveCoin('livecoin', 'Livecoin', 'https://www.livecoin.net'),
// // 	new Kraken('kraken', 'Kraken', 'https://www.kraken.com'),
// // 	new Coss('coss', 'COSS.io', 'https://coss.io'),
// // 	new Quoinex('quoinex', 'QUOINEX', 'https://quoinex.com'),
// // 	new Qryptos('qryptos', 'QRYPTOS', 'https://www.qryptos.com'),
// // 	new BitQuick('bitquick', 'BitQuick', 'https://www.bitquick.co'),
// // 	new Korbit('korbit', 'Korbit', 'https://www.korbit.co.kr'),
// // 	new Bithumb('bithumb', 'Bithumb', 'https://www.bithumb.com'),
// // 	// new ____('____', '____', '____'),
// // ] as Array<ExchangeBuilder>

// // console.log('exchanges', exchanges)









