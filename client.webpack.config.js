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
const ExtractTextPlugin = require('extract-text-webpack-plugin')



const sargs = process.env.args.split(':')
const env = {
	env: { dev: 'DEVELOPMENT', prod: 'PRODUCTION' }[sargs[0]],
	[sargs[0]]: true,
	watch: sargs.indexOf('watch') >= 0,
	vendor: sargs.indexOf('vendor') >= 0,
}
// Object.assign(env, require('./client.env.json')[env.env])



const config = {

	context: __dirname,
	entry: { client: ['./client/client.ts'] },
	output: {
		path: path.resolve(__dirname, './client/dist'),
		publicPath: '/',
		filename: '[name].build.js',
		chunkFilename: '[id].[name].chunk.js',
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
				test: /\.(css|sass|scss)$/,
				loader: ['style-loader', 'css-loader', 'sass-loader'],
			},
			// {
			// 	test: /\.(css|sass|scss)$/,
			// 	loader: ExtractTextPlugin.extract({
			// 		fallback: 'style-loader',
			// 		// use: ['css-loader', 'sass-loader'],
			// 		use: [
			// 			{ loader: 'css-loader', options: { sourceMap: !env.prod } },
			// 			{ loader: 'sass-loader', options: { sourceMap: !env.prod } },
			// 		],
			// 	}),
			// },
			// {
			// 	test: /\.css$/,
			// 	loader: ['style-loader', 'css-loader'],
			// },
			// {
			// 	test: /\.(css|sass|scss)$/,
			// 	loader: [
			// 		{ loader: 'style-loader' },
			// 		{ loader: 'css-loader', options: { sourceMap: !env.prod } },
			// 		{
			// 			loader: 'sass-loader', options: {
			// 				sourceMap: !env.prod,
			// 				// includePaths: [
			// 				// 	path.resolve('./node_modules/bootstrap-sass/assets/stylesheets')
			// 				// ],
			// 			}
			// 		},
			// 	],
			// },
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: 'file-loader',
				options: {
					// publicPath: '/dist/',
					name: '[name].[ext]',
				},
			},
			{
				test: /worker/,
				loader: 'file-loader',
				options: {
					// publicPath: '/dist/',
					name: '[name].[ext]',
				},
			},
		],
	},

	plugins: [
		new webpack.IgnorePlugin(/typescript/),
		// new webpack.IgnorePlugin(/mdi/),
		new webpack.ProgressPlugin(),
		// new ExtractTextPlugin('style.css'),
		// new BundleAnalyzerPlugin({ analyzerPort: 9999 }),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor.dll', minChunks: ({ resource }) => /node_modules/.test(resource),
			// async: true, children: true,
		}),
		// new webpack.optimize.AggressiveSplittingPlugin(),

		// new HtmlWebpackPlugin({
		// 	template: 'client/index.html', inject: true,
		// }),



		// new AutoDllPlugin({
		// 	debug: true,
		// 	filename: '[name].dll.js',
		// 	entry: {
		// 		vendor: vendors,
		// 	},
		// }),

		// new webpack.DllReferencePlugin({
		// 	context: process.cwd(),
		// 	manifest: require(path.resolve('./client/dist', 'vendor.dll.json')),
		// }),

		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'manifest',
		// 	minChunks: Infinity
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor.dll', minChunks: ({ resource }) => /node_modules/.test(resource),
		// 	// async: true, children: true,
		// }),
		// new AutoDllPlugin({
		// 	debug: true,
		// 	filename: '[name].dll.js',
		// 	entry: {
		// 		vendor: ['vue', 'lodash', 'node-forge', 'axios'],
		// 	},
		// }),
		// new webpack.DllPlugin({
		// 	path: path.resolve(process.cwd(), './client/dist', '[name].json'),
		// 	name: '[name]',
		// }),
		// new webpack.optimize.ModuleConcatenationPlugin(),
		// new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }),
	],

	// stats: 'verbose',
	stats: 'normal',
	profile: true,
	devtool: 'source-map',
	// cache: true,

}



if (process.env.dev) {
	config.watchOptions = { ignored: /node_modules/ }
	config.plugins.push(new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]))
	config.plugins.push(new LiveReloadPlugin({ appendScriptTag: true }))

	// config.plugins.push(new webpack.NamedModulesPlugin())

	// config.plugins.push(new webpack.BannerPlugin({
	// 	banner: "hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
	// }))

}



if (process.env.prod) {

}



Object.keys(env).forEach(function(key) {
	env[key] = JSON.stringify(env[key])
})
config.plugins.push(new webpack.DefinePlugin({ 'process.$webpack': env }))



console.log('client.webpack.config >'); eyes.inspect(config);

module.exports = config



// const vendors = [
// 	// 'animate.css',
// 	// 'av-ts',
// 	// 'awesome-phonenumber',
// 	// 'axios',
// 	// 'bluebird',
// 	// 'buefy',
// 	// 'bulma',
// 	// 'chartist',
// 	// 'copy-text-to-clipboard',
// 	// 'delay',
// 	// 'eventemitter3',
// 	// 'fingerprintjs2',
// 	// 'fuzzy',
// 	'humanize-plus',
// 	'lodash',
// 	// 'luxon',
// 	'mdi',
// 	// 'moment',
// 	'node-forge',
// 	'p-all',
// 	// 'p-event',
// 	// 'p-forever',
// 	// 'p-queue',
// 	// 'p-timeout',
// 	// 'query-string',
// 	// 'rxjs',
// 	'secure-ls',
// 	// 'simple-statistics',
// 	// 'technicalindicators',
// 	// 'timeseries-analysis',
// 	'vue',
// 	// 'vue-class-component',
// 	// 'vue-property-decorator',
// 	// 'vue-router',
// 	// 'vuex',
// ]

// if (env.vendor) {
// 	// config.entry = vendors
// 	// config.entry = {}
// 	// config.externals = /node_modules/
// 	// vendors.forEach(function(vendor) {
// 	// 	config.entry[vendor] = [vendor]
// 	// })
// 	config.entry = { vendor: ['./client/client.ts'] }
// 	config.output.filename = '[name].dll.js'
// 	config.output.library = '[name]'
// 	config.plugins.push(new webpack.DllPlugin({
// 		path: path.resolve(process.cwd(), './client/dist', '[name].dll.json'),
// 		name: '[name]',
// 	}))
// }



// if (env.watch) {
// 	config.watchOptions = { ignored: /node_modules/ }
// 	config.plugins.push(new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]))
// 	config.plugins.push(new LiveReloadPlugin({ appendScriptTag: true }))

// 	config.plugins.push(new webpack.optimize.AggressiveSplittingPlugin())

// 	config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
// 		name: 'vendor.dll', minChunks: ({ resource }) => /node_modules/.test(resource),
// 		// async: true, children: true,
// 	}))
// }


