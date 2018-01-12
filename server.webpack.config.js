// 

const path = require('path')
const webpack = require('webpack')
const externals = require('webpack-node-externals')



module.exports = {

	entry: './server/server.ts',
	output: {
		path: path.resolve(__dirname, './server/dist'),
		publicPath: '/server/dist/',
		filename: 'build.js',
	},

	target: 'node',

	externals: [externals()],

	resolve: {
		extensions: ['.ts', '.js'],
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {

				},
			},
		],
	},

	plugins: [

	],

	devtool: 'source-map',

}



