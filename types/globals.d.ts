// 

export { }



declare global {

	namespace NodeJS {
		interface Process {
			dtsgen: (name: string, value: any) => void
			DEVELOPMENT: boolean
			PRODUCTION: boolean
			$webpack: any
		}
	}

}








