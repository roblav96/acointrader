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
		id: string
		slug: string
		name: string
		fiat: boolean
		crypto: boolean
		coin: boolean
		token: string
		mineable: boolean
		availableSupply: number
		totalSupply: number
		maxSupply: number
	}






}





