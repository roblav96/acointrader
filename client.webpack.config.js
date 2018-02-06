// 

const eyes = require('eyes')
const webpack = require('webpack')
const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const env = require('./client.env.json')[process.env.NODE_ENV]
env.env = process.env.NODE_ENV



const config = {

	context: __dirname,
	entry: './client/client.ts',
	output: {
		path: path.resolve(__dirname, './client/public/dist'),
		publicPath: '/client/public/dist/',
		filename: 'build.js',
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
					extractCSS: true,
				},
			},
			{
				test: /\.css$/,
				// loader: ['style-loader', 'css-loader'],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
				}),
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: 'file-loader',
				options: {

				},
			},
		],
	},

	plugins: [
		new webpack.IgnorePlugin(/typescript/),
		new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
		new ExtractTextPlugin('styles.css'),
	],

	devtool: 'source-map',

}



if (process.env.NODE_ENV == 'DEVELOPMENT') {
	config.watchOptions = { ignored: /node_modules/ }
	config.plugins.push(new LiveReloadPlugin({ appendScriptTag: true }))
	// config.plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin())
}



if (process.env.NODE_ENV == 'PRODUCTION') {

}



Object.keys(env).forEach(function(key) {
	env[key] = JSON.stringify(env[key])
})
config.plugins.push(new webpack.DefinePlugin({ 'process.$webpack': env }))



// console.log('webpack.config.js >'); eyes.inspect(config);

module.exports = config


