// 

declare namespace Upbit {

	interface SymbolMarketStatus {
		ask: {
			currency: string
			min_total: number
			price_unit: any
		}
		bid: {
			currency: string
			min_total: number
			price_unit: any
		}
		id: string
		krw_simple_bid: {
			available: boolean
			max: number
			min: number
		}
		market_order_locking_buffer_factor: string
		max_total: string
		name: string
		order_sides: Array<string>
		order_types: Array<string>
		state: string
	}

}




