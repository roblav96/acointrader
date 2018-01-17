// 

const eyes = require('eyes')
const clc = require('cli-color')
const webpack = require('webpack')
const path = require('path')
const NodeExternals = require('webpack-node-externals')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

const env = require('./server/env.json')[process.env.NODE_ENV]
env.env = process.env.NODE_ENV



const config = {

	entry: './server/server.ts',
	output: {
		path: path.resolve(__dirname, './server/dist'),
		publicPath: '/server/dist/',
		filename: 'build.js',
	},

	target: 'node',

	externals: [NodeExternals()],

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



if (process.env.NODE_ENV == 'DEVELOPMENT') {
	config.watchOptions = { ignored: /node_modules/ }
	// config.plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin())
}



if (process.env.NODE_ENV == 'PRODUCTION') {
	
}



Object.keys(env).forEach(function(key) {
	env[key] = JSON.stringify(env[key])
})
config.plugins.push(new webpack.DefinePlugin({ 'process.$webpack': env }))



// console.log(clc.bold.blue('client.webpack.config.js >')); eyes.inspect(config);

module.exports = config


