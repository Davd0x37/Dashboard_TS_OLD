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
export const webpackMode = environment.dev ? 'development' : 'production'
