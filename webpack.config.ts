import { CheckerPlugin } from 'awesome-typescript-loader'
import HardLink from 'hard-source-webpack-plugin'
import { join, resolve } from 'path'
import nodeExternals from 'webpack-node-externals'
import { webpackMode } from './config/config'

interface WebpackOptions {
	entry: string
	target: string
	output: {
		filename: string
		path: any
	}
}

const webpack = (options: WebpackOptions) => {
	return {
		target: options.target,
		entry: options.entry,
		output: {
			filename: options.output.filename,
			path: options.output.path
		},
		mode: webpackMode,
		devtool: 'source-map',
		resolve: {
			extensions: [ '.ts', '.tsx', '.gql', '.js' ]
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					// use: 'ts-loader',
					use: 'awesome-typescript-loader',
					exclude: [ 'node_modules' ]
				},
				{
					test: /\.(gql|graphql)$/,
					use: 'raw-loader',
					exclude: [ 'node_modules' ]
				}
			]
		},
		externals: [ nodeExternals() ]
	}
}

export default [
	// Api
	{
		...webpack({
			entry: './app/GraphQLApp.ts',
			target: 'node',
			output: {
				filename: 'app.js',
				path: join(__dirname, 'www/api')
			}
		}),
		// node: {
		//   __dirname: true
		// },
		plugins: [ new HardLink(), new CheckerPlugin() ]
	},
	// Client
	{
		...webpack({
			entry: './app/client/ts/main.ts',
			target: 'web',
			output: {
				filename: 'app.js',
				path: join(__dirname, 'www/js')
			}
		}),
		plugins: [ new HardLink(), new CheckerPlugin() ]
	},
	// Test
	{
		...webpack({
			entry: './app/test/app.spec.ts',
			target: 'node',
			output: {
				filename: 'app.js',
				path: join(__dirname, 'www/test')
			}
		}),
		// node: {
		//   __dirname: true
		// },
		plugins: [ new HardLink(), new CheckerPlugin() ]
	}
]
