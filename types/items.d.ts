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

	type Coin = CoinMeta & { [exchange: string]: Array<string> }
	interface CoinMeta {
		id: string
		name: string
		available: number
		total: number
		max: number
	}






}





