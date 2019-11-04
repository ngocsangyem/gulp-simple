import gulp from 'gulp';
import Fiber from 'fibers';
import autoprefixer from 'autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cssDeclarationSorter from 'css-declaration-sorter';

import { plugins, args, config, taskTarget, browserSync } from '../utils';

const dirs = config.directories;
const entries = config.entries;
const dest = `${taskTarget}/${dirs.component}`;
const postCssPlugins = [
	autoprefixer({
		grid: true
	}),
	cssDeclarationSorter({
		order: 'concentric-css'
	})
];

gulp.task('componentSASS', () => {
	return (
		gulp
			.src([
				`${dirs.source}${dirs.app}${dirs.pages}${dirs.component}**/*.+(sass|scss)`,
				`!${dirs.source}${dirs.app}${dirs.pages}${dirs.component}index.+(sass|scss)`
			])
			.pipe(
				plugins.plumber({
					errorHandler: plugins.notify.onError(
						'Error: <%= error.message %>'
					)
				})
			)
			// .pipe(
			// 	plugins.sass({
			// 		fiber: Fiber,
			// 		outputStyle: 'expanded',
			// 		precision: 10
			// 	})
			// )
			// .on('error', function(err) {
			// 	plugins.util.log(err);
			// })
			.on('error', plugins.notify.onError(config.defaultNotification))
			// .pipe(plugins.postcss(postCssPlugins))
			// .pipe(gcmq())
			// .pipe(
			// 	plugins.cssnano({
			// 		rebase: false
			// 	})
			// )
			.pipe(gulp.dest(dest))
	);
});

gulp.task('componentPUG', () => {
	return gulp
		.src(`${dirs.source}${dirs.app}${dirs.pages}${dirs.component}**/*.pug`)
		.pipe(
			plugins.plumber({
				errorHandler: plugins.notify.onError(
					'Error: <%= error.message %>'
				)
			})
		)
		.pipe(
			plugins.pug({
				pretty: '\t'
			})
		)
		.on('error', function(err) {
			plugins.util.log(err);
		})
		.on('error', plugins.notify.onError(config.defaultNotification))
		.pipe(gulp.dest(dest));
});

gulp.task('componentSCRIPT', () => {
	return (
		gulp
			.src([
				`${dirs.source}${dirs.app}${dirs.pages}${dirs.component}**/*.+(js|ts)`,
				`!${dirs.source}${dirs.app}${dirs.pages}${dirs.component}**/*.test.+(js|ts)`,
				`!${dirs.source}${dirs.app}${dirs.pages}${dirs.component}index.+(js|ts)`
			])
			.pipe(
				plugins.plumber({
					errorHandler: plugins.notify.onError(
						'Error: <%= error.message %>'
					)
				})
			)
			// .pipe(
			// 	plugins.babel({
			// 		presets: ['@babel/env']
			// 	})
			// )
			// .pipe(plugins.terser())
			.pipe(gulp.dest(dest))
	);
});
