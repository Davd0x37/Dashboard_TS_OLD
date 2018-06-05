import path from 'path'

/**
 * Absolute path to root directory.
 * There is no other way to make it easy...
 * because gulp is passing CWD(current working directory)
 * to __dirname and file (idk how to call it)
 * So we need to make workaround.
 * 2x ../ because we are in config->gulp
 */
export const rootPath = path.resolve(__dirname, '../')

/**
 * Create path to files from root path
 *
 * @param {string} files
 * @returns {string} resolved path from root to files
 */
export const rootPathFunc = (files: string): string => {
	return path.resolve(rootPath, files)
}

/**
 * Paths for files, dir etc.
 */
export const paths = {
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
 * Name of main typescript file for webpack
 */
// export const entryFile = "main.ts";

/**
 * Get NODE_ENV variable from cross-env
 */
export const NODE_ENV = process.env.NODE_ENV

/**
 * Define current environment
 * Production or development
 * Depends on NODE_ENV variable which is created by cross-env
 */
export const environment = {
	prod: NODE_ENV === 'production',
	dev: NODE_ENV === 'development'
}

/**
 * Define webpack mode for config file
 */
export const webpackMode = environment.dev ? 'development' as 'development' : 'production' as 'production'

/**
 * Define options for sass compiler
 */
export const sassOptions = {
	// nested, expanded, compact, compressed
	outputStyle: environment.prod ? 'compressed' : 'expanded',
	precision: 5
}
