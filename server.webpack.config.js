// 

const webpack = require('webpack')
const path = require('path')
const node_externals = require('webpack-node-externals')



module.exports = {

	entry: './server/server.ts',
	output: {
		path: path.resolve(__dirname, './server/dist'),
		publicPath: '/server/dist/',
		filename: 'build.js',
	},

	target: 'node',

	externals: [node_externals()],

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
		new webpack.IgnorePlugin(/typescript/),
	],

	devtool: 'source-map',

}



