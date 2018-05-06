import * as path from 'path';
const nodeExternals = require('webpack-node-externals')
import { entryFile, environment, rootPathFunc, webpackMode } from './config/config';

const webpack = {
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(gql)$/,
				// use: 'graphql-tag/loader',
				use: 'raw-loader',
				exclude: /node_modules/
			}
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.gql', '.js']
	},
	externals: [nodeExternals()]
}

export const API = {
	mode: webpackMode,
	target: "node" as "node",
	...webpack,
	watch: true
};

export const Client = {
	mode: webpackMode,
	// target: "node" as "node",
	...webpack,
};
