import path from 'path';
import { entryFile, environment, rootPathFunc, webpackMode } from '../config';

export default {
	mode: webpackMode,
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(gql|graphql)$/,
				use: 'graphql-tag/loader',
				exclude: /node_modules/
			}
		]
	}
};
