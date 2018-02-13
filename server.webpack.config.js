// 

const eyes = require('eyes'); eyes.defaults.maxLength = 131072;
const webpack = require('webpack')
const path = require('path')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const NodeExternals = require('webpack-node-externals')
const ShellPlugin = require('webpack-shell-plugin')



const sargs = process.env.args.split(':')
const env = {
	env: { dev: 'DEVELOPMENT', prod: 'PRODUCTION' }[sargs[0]],
	[sargs[0]]: true,
	watch: sargs.indexOf('watch') >= 0,
}
Object.assign(env, require('./server.env.json')[env.env])



const config = {

	context: __dirname,
	entry: './server/server.ts',
	output: {
		path: path.resolve(__dirname, './server/dist'),
		publicPath: '/server/dist/',
		filename: 'server.js',
	},

	target: 'node',
	externals: [NodeExternals()],
	resolve: { extensions: ['.ts', '.js'] },

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					reportFiles: ['server/**/*.ts', 'shared/**/*.ts', 'types/**/*.d.ts'],
				},
			},
		],
	},

	plugins: [
		new webpack.ProgressPlugin(),
	],

	stats: 'normal',
	devtool: 'inline-source-map',

}



if (env.dev) {
	// config.profile = true
	// config.plugins.push(new BundleAnalyzer())
	config.plugins.push(new ShellPlugin({
		onBuildEnd: ['supervisor --non-interactive --quiet server/dist/server.js'],
	}))
}

if (env.watch) {
	config.watch = true
	config.plugins.push(new webpack.WatchIgnorePlugin([/node_modules/, /dist/, /client/]))
}



if (env.prod) {

}



Object.keys(env).forEach(function(key) {
	env[key] = JSON.stringify(env[key])
})
config.plugins.push(new webpack.DefinePlugin({ 'process.$webpack': env }))



// console.log('SERVER config >'); eyes.inspect(config);

module.exports = config


