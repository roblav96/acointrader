// 

const eyes = require('eyes')
const webpack = require('webpack')
const path = require('path')
const NodeExternals = require('webpack-node-externals')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

const env = require('./server/env.json')[process.env.NODE_ENV]
env.env = process.env.NODE_ENV



const config = {

	context: __dirname,
	entry: './server/server.ts',
	output: {
		path: path.resolve(__dirname, './server/dist'),
		publicPath: '/server/dist/',
		filename: 'build.js',
	},

	target: 'node',
	// node: { __filename: true },
	externals: [NodeExternals()],
	resolve: { extensions: ['.ts', '.js'] },

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					// reportFiles: ['server/**/*.ts'],
					// context: __dirname,
					context: './',
				},
			},
		],
	},

	plugins: [
		new webpack.IgnorePlugin(/typescript/),
		new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
	],

}



if (process.env.NODE_ENV == 'DEVELOPMENT') {
	config.devtool = 'source-map'
	config.watchOptions = { ignored: /node_modules/ }
	// config.plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin())
}



if (process.env.NODE_ENV == 'PRODUCTION') {
	config.devtool = 'inline-source-map'
}



Object.keys(env).forEach(function(key) {
	env[key] = JSON.stringify(env[key])
})
config.plugins.push(new webpack.DefinePlugin({ 'process.$webpack': env }))



// console.log('server.webpack.config.js >'); eyes.inspect(config);

module.exports = config


