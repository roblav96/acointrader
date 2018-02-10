// 

const eyes = require('eyes'); eyes.defaults.maxLength = 131072;
const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const AutoDllPlugin = require('autodll-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')



const vendor = [
	'axios',
	'lodash',
	'node-forge',
	'vue',
]



const config = {

	context: process.cwd(),
	entry: { vendor },
	output: {
		path: path.resolve(process.cwd(), './client/public/dist'),
		publicPath: '/client/public/dist/',
		filename: '[name].js',
		library: '[name]',
	},

	node: { fs: 'empty' },

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
					reportFiles: ['client/**/*.ts', 'shared/**/*.ts', 'types/**/*.d.ts'],
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {

				},
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: 'file-loader',
				options: {
					publicPath: '/dist/',
					name: '[name].[ext]',
				},
			},
			{
				test: /worker/,
				loader: 'file-loader',
				options: {
					publicPath: '/dist/',
					name: '[name].[ext]',
				},
			},
		],
	},

	plugins: [
		new webpack.IgnorePlugin(/typescript/),
		new webpack.ProgressPlugin(),
		new BundleAnalyzerPlugin({ analyzerPort: 9992 }),

		new webpack.DllPlugin({
			path: path.resolve(process.cwd(), './client/public/dist', '[name].json'),
			name: '[name]',
		}),

		// new AutoDllPlugin({
		// 	debug: true,
		// 	filename: '[name].dll.js',
		// 	entry: {
		// 		vendor: ['vue', 'lodash', 'node-forge', 'axios'],
		// 	},
		// }),

		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor.dll', minChunks: ({ resource }) => /node_modules/.test(resource),
		// 	// async: true, children: true,
		// }),
		// new webpack.DllPlugin({
		// 	path: path.resolve(process.cwd(), './client/public/dist', '[name].json'),
		// 	name: '[name]',
		// }),
		// new webpack.optimize.ModuleConcatenationPlugin(),
		// new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }),
		// new WebpackMonitor({
		// 	port: 9991, capture: true, launch: true,
		// }),
	],

	stats: 'verbose',
	profile: true,
	devtool: 'source-map',

}



if (process.env.NODE_ENV == 'DEVELOPMENT') {

}



if (process.env.NODE_ENV == 'PRODUCTION') {

}



console.log('client.vendor.webpack.config >'); eyes.inspect(config);

module.exports = config

