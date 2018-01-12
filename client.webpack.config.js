// 

const path = require('path')
const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const envjson = require('./client/env.json')
const env = envjson[process.env.NODE_ENV]



module.exports = {

	entry: './client/client.ts',
	output: {
		path: path.resolve(__dirname, './client/public/dist'),
		publicPath: '/client/public/dist/',
		filename: 'build.js',
	},

	node: {
		fs: 'empty',
	},

	resolve: {
		extensions: ['.vue', '.ts', '.js'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
		},
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					// appendTsSuffixTo: [/\.vue$/],
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {

				},
			},
			{
				test: /\.(png|jpg|ico|gif|svg)$/,
				loader: 'file-loader',
				options: {
					objectAssign: 'Object.assign',
				},
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader'],
			},
			{
				test: /\.styl$/,
				loader: ['style-loader', 'css-loader', 'stylus-loader'],
			},
		],
	},

	plugins: [
		new LiveReloadPlugin({ appendScriptTag: true }),
		new webpack.IgnorePlugin(/typescript/),
	],

	devtool: 'source-map',

}



