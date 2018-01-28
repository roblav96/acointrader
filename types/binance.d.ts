// 

declare namespace Binance {

	interface ExchangeInfoResponse {
		exchangeFilters: any[]
		rateLimits: {
			interval: string
			limit: number
			rateLimitType: string
		}[]
		serverTime: number
		symbols: {
			baseAsset: string
			baseAssetPrecision: number
			filters: {
				filterType: string
				maxPrice: string
				minPrice: string
				tickSize: string
			}[]
			icebergAllowed: boolean
			orderTypes: string[]
			quoteAsset: string
			quotePrecision: number
			status: string
			symbol: string
		}[]
		timezone: string
	}

	// interface Instrument {
	// 	baseAsset: string
	// 	baseAssetPrecision: number
	// 	filters: Array<{
	// 		filterType: string
	// 		maxPrice: string
	// 		minPrice: string
	// 		tickSize: string
	// 	}>
	// 	icebergAllowed: boolean
	// 	orderTypes: Array<string>
	// 	quoteAsset: string
	// 	quotePrecision: number
	// 	status: string
	// 	symbol: string
	// }

	interface SocketDepth {

	}

}





