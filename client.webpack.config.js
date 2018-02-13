// 

const eyes = require('eyes'); eyes.defaults.maxLength = 131072;
const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')



const sargs = process.env.args.split(':')
const env = {
	env: { dev: 'DEVELOPMENT', prod: 'PRODUCTION' }[sargs[0]],
	[sargs[0]]: true,
	watch: sargs.indexOf('watch') >= 0,
}
// Object.assign(env, require('./client.env.json')[env.env])

// console.log('env >')
// eyes.inspect(env)



const config = {

	context: __dirname,
	entry: { client: ['./client/client.ts'] },
	output: {
		path: path.resolve(__dirname, './client/dist'),
		publicPath: '/',
		filename: '[name].build.js',
		chunkFilename: '[id].[name].chunk.js',
	},

	node: {
		setImmediate: false, dgram: 'empty', fs: 'empty', net: 'empty', tls: 'empty', child_process: 'empty',
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
				test: /\.(css|sass|scss)$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { sourceMap: !env.prod } },
						{ loader: 'sass-loader', options: { sourceMap: !env.prod } },
					],
				}),
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
			{
				test: /worker/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
		],
	},

	plugins: [
		new webpack.IgnorePlugin(/typescript/),
		new webpack.ProgressPlugin(),
		// new webpack.NoEmitOnErrorsPlugin(),
		// new BundleAnalyzerPlugin({ analyzerPort: 9999 }),

		// new webpack.HashedModuleIdsPlugin(),
		// new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor', minChunks: ({ resource }) => /node_modules/.test(resource),
			// async: true, children: true,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity,
		}),
		// new webpack.optimize.AggressiveSplittingPlugin(),

		new ExtractTextPlugin({
			filename: '[name].styles.css',
			// allChunks: true,
		}),
		new HtmlWebpackPlugin({
			template: 'client/index.html',
			chunksSortMode: 'dependency',
			inject: true,
			filename: 'index.html',
		}),
	],

	stats: 'verbose',
	// stats: 'normal',
	devtool: 'source-map',
	// cache: true,

}



if (env.dev) {
	config.plugins.push(new LiveReloadPlugin({ appendScriptTag: true }))
	config.profile = true
}

if (env.watch) {
	config.watch = true
	config.plugins.push(new webpack.WatchIgnorePlugin([/node_modules/, /dist/, /server/]))
}



if (env.prod) {

}



Object.keys(env).forEach(function(key) {
	env[key] = JSON.stringify(env[key])
})
config.plugins.push(new webpack.DefinePlugin({ 'process.$webpack': env }))



// console.log('client.webpack.config >'); eyes.inspect(config);

module.exports = config


