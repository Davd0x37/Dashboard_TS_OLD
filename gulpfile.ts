import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sequence from 'gulp-sequence'
import sourcemaps from 'gulp-sourcemaps'
import path from 'path'
const webpack = require('webpack')
import webpackStream from 'webpack-stream'
import { environment, paths, sassOptions } from './config/config'
import { API, Client } from './webpack.config'

/**
 * SERVERSIDE Typescript transpiler
 * Uses webpack stream
 */
gulp.task('api-typescript', () => {
	return gulp
		.src(`${paths.appDir}/app.ts`)
		.pipe(webpackStream(API, webpack))
		.pipe(
			rename({
				basename: 'app',
				extname: '.js'
			})
		)
		.pipe(gulp.dest(paths.www.api))
})
/**
 * API Typescript watcher
 */
gulp.task(`api-typescript-watch`, (done) => {
	gulp.watch(`${paths.appDir}/**/*.*`, { ignored: [paths.app.public, paths.app.views] }, gulp.series('api-typescript'))
	done()
})

/**
 * Typescript transpiler
 * Uses webpack stream
 */
gulp.task('typescript', () => {
	return gulp
		.src(`${paths.app.ts}/main.ts`)
		.pipe(webpackStream(Client, webpack))
		.pipe(
			rename({
				basename: 'index',
				extname: '.js'
			})
		)
		.pipe(gulp.dest(paths.www.js))
})

/**
 * Typescript watcher
 */
gulp.task(`typescript-watch`, (done) => {
	gulp.watch(paths.app.ts, gulp.series('typescript'))
	done()
})

/**
 * Sass compiler
 * If NODE_ENV is set to 'development'
 * Sourcemaps are used
 */
gulp.task('sass', () => {
	return gulp
		.src(`${paths.app.scss}/index.scss`)
		.pipe(gulpif(environment.dev, sourcemaps.init()))
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulpif(environment.dev, sourcemaps.write(paths.www.css)))
		.pipe(gulp.dest(paths.www.css))
})

/**
 * Sass watcher
 */
gulp.task('sass-watch', (done) => {
	gulp.watch(`${paths.app.scss}/**/*.scss`, gulp.series('sass'))
	done()
})

/**
 * HTML minifier
 * Copies files from src to www directory and removes whitespace
 */
gulp.task('html-minify', () => {
	return gulp
		.src(paths.app.views)
		.pipe(gulpif(environment.prod, htmlmin({ collapseWhitespace: true })))
		.pipe(gulp.dest(paths.wwwDir))
})

/**
 * HTML watcher
 */
gulp.task('html-watch', (done) => {
	gulp.watch(paths.app.views, gulp.series('html-minify'))
	done()
})

/**
 * Default task for gulp
 * Running sequence -> typescript, sass, minify html
 */
gulp.task('default', gulp.series('typescript', 'sass', 'html-minify', 'api-typescript'))
gulp.task('generate-api', gulp.series('api-typescript-watch'))
gulp.task('generate-client', gulp.series('typescript-watch', 'sass-watch', 'html-watch'))
gulp.task('serve', gulp.series('generate-api', 'generate-client'))