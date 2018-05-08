import browserSync from 'browser-sync';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sequence from 'gulp-sequence';
import sourcemaps from 'gulp-sourcemaps';
import path from 'path';
const webpack = require('webpack');
import webpackStream from 'webpack-stream';
import { environment, rootPathFunc, sassOptions } from './config/config';
import { API, Client } from './webpack.config';

/**
 * Browsersync server instance
 */
const LIVE = browserSync.create();

/**
 * SERVERSIDE Typescript transpiler
 * Uses webpack stream
 */
gulp.task('api-typescript', () => {
	return gulp
		.src(rootPathFunc('api/app.ts'))
		.pipe(webpackStream(API, webpack))
		.pipe(
			rename({
				basename: 'app',
				extname: '.js'
			})
		)
		.pipe(gulp.dest(rootPathFunc('www/api')))
		.pipe(gulpif(environment.dev, LIVE.stream()));
});

/**
 * Typescript transpiler
 * Uses webpack stream
 */
gulp.task('typescript', () => {
	return gulp
		.src(rootPathFunc('src/ts/main.ts'))
		.pipe(webpackStream(Client, webpack))
		.pipe(
			rename({
				basename: 'index',
				extname: '.js'
			})
		)
		.pipe(gulp.dest(rootPathFunc('www/js')))
		.pipe(gulpif(environment.dev, LIVE.stream()));
});

/**
 * Typescript watcher
 */
gulp.task('typescript-watch', (done) => {
	gulp.watch(rootPathFunc('src/ts/**/*.ts'), gulp.series('typescript'));
	done();
});

/**
 * Sass compiler
 * If NODE_ENV is set to 'development'
 * Sourcemaps are used
 */
gulp.task('sass', () => {
	return gulp
		.src(rootPathFunc('src/scss/index.scss'))
		.pipe(gulpif(environment.dev, sourcemaps.init()))
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulpif(environment.dev, sourcemaps.write(rootPathFunc('www/css/'))))
		.pipe(gulp.dest(rootPathFunc('www/css/')))
		.pipe(gulpif(environment.dev, LIVE.stream()));
});

/**
 * Sass watcher
 */
gulp.task('sass-watch', (done) => {
	gulp.watch(rootPathFunc('src/scss/**/*.scss'), gulp.series('sass'));
	done();
});

/**
 * HTML minifier
 * Copies files from src to www directory and removes whitespace
 */
gulp.task('html-minify', () => {
	return gulp
		.src(rootPathFunc('src/view/**/*.html'))
		.pipe(gulpif(environment.prod, htmlmin({ collapseWhitespace: true })))
		.pipe(gulp.dest(rootPathFunc('www')))
		.pipe(gulpif(environment.dev, LIVE.stream()));
});

/**
 * HTML watcher
 */
gulp.task('html-watch', (done) => {
	gulp.watch(rootPathFunc('src/view/**/*.html'), gulp.series('html-minify'));
	done();
});

/**
 * Create HMR
 */
gulp.task('livereload', (done) => {
	LIVE.init({
		server: {
			baseDir: rootPathFunc('www')
		},
		https: true,
		browser: 'firefox',
		cors: true,
		reloadDebounce: 0
	});
	LIVE.watch(rootPathFunc('api/**/*.(ts|gql)')).on('change', gulp.series('api-typescript'));
	LIVE.watch(rootPathFunc('src/ts/**/*.ts')).on('change', gulp.series('typescript'));
	LIVE.watch(rootPathFunc('src/scss/**/*.scss')).on('change', gulp.series('sass'));
	// LIVE.watch(rootPathFunc('www/index.html')).on('change', LIVE.reload);
	LIVE.watch(rootPathFunc('src/view/index.html')).on('change', gulp.series('html-minify', LIVE.reload));
});

/**
 * Default task for gulp
 * Running sequence -> typescript, sass, minify html
 */
gulp.task('default', gulp.series('typescript', 'sass', 'html-minify', 'api-typescript'));
gulp.task('serve', gulp.series('default', 'livereload'));
