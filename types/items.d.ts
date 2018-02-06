// 



declare namespace Items {

	interface Exchange {
		id: string
		name: string
		website: string
		hostname: string
		logoSquare: string
		logoWide: string
		logoBanner: string
		inaugurated: number
		description: string
		mobileapp: boolean
		fees: number
		usability: number
		coinclarity: string
	}

	type ExchangesIndex = {[exchange in keyof AllExchanges]: Array<string>}
	interface Asset extends ExchangesIndex {
		symbol: string
		name: string
		logo: string
		fiat: boolean
		commodity: boolean
		crypto: boolean
		coin: boolean
		token: string
		mineable: boolean
		availableSupply: number
		totalSupply: number
		maxSupply: number
	}

	interface FiatQuote {
		pair: string
		base: string
		quote: string
		symbol: string
		name: string
		exchange: string
		bidPrice: number
		bidSize: number
		askPrice: number
		askSize: number
		price: number
		change: number
		changePercent: number
		updated: number
		stamp: number
	}

	interface MarketTrade {
		id: string
		pair: string
		exchange: keyof AllExchanges
		side: 'BUY' | 'SELL'
		price: number
		size: number
		executed: number

	}






}





