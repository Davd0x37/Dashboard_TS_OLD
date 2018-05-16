import { webpackMode } from './config/config';
const nodeExternals = require('webpack-node-externals')

const webpack = {
	mode: webpackMode,
	resolve: {
		extensions: ['.ts', '.tsx', '.gql', '.js']
	},
}

export const API = {
	...webpack,
	target: "node" as "node",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(gql)$/,
				use: 'raw-loader',
				exclude: /node_modules/
			}
		],
	},
	externals: [nodeExternals()]
};

export const Client = {
	...webpack,
	target: "web" as "web",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			},
			{
				test: /\.(gql)$/,
				use: 'raw-loader',
			}
		],
	},
};
