const { resolve } = require('path')

/**
 * Absolute path to root directory.
 * There is no other way to make it easy...
 * because gulp is passing CWD(current working directory)
 * to __dirname and file (idk how to call it)
 * So we need to make workaround.
 * 2x ../ because we are in config->gulp
 */
const rootPath = resolve(__dirname, '../')

/**
 * Create path to files from root path
 *
 * @param {string} files
 * @returns {string} resolved path from root to files
 */
const rootPathFunc = (files) => {
	return resolve(rootPath, files)
}

/**
 * Paths for files, dir etc.
 */
const paths = {
	appDir: 'app',
	wwwDir: 'www',
	app: {
		public: 'app/public',
		views: 'app/views/**/*.html',
		scss: 'app/public/scss',
		ts: 'app/public/ts',
		test: 'app/**/*.spec.ts'
	},
	www: {
		css: 'www/css',
		img: 'www/img',
		js: 'www/js',
		api: 'www/api',
		test: 'www/test'
	}
}

/**
 * Get NODE_ENV variable from cross-env
 */
const NODE_ENV = process.env.NODE_ENV

/**
 * Define current environment
 * Production or development
 * Depends on NODE_ENV variable which is created by cross-env
 */
const environment = {
	prod: NODE_ENV === 'production',
	dev: NODE_ENV === 'development'
}

/**
 * Define webpack mode for config file
 */
const webpackMode = environment.dev ? 'development' : 'production'

module.exports = {
	environment,
	webpackMode,
	paths
}
