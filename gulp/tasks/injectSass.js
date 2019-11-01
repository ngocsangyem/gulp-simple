import gulp from 'gulp';

import { plugins, args, config, taskTarget, browserSync } from '../utils';

const dirs = config.directories;
const dest = `${dirs.source}${dirs.app}${dirs.component}`;
const fileInject = [
	`${dirs.source}${dirs.app}${dirs.component}**/*.{sass,scss}`,
	`!${dirs.source}${dirs.app}${dirs.component}index.{sass,scss}`
];

gulp.task('injectSass', () => {
	return gulp
		.src([`${dirs.source}${dirs.app}${dirs.component}index.{sass,scss}`])
		.pipe(
			plugins.plumber({
				errorHandler: plugins.notify.onError(
					'Error: <%= error.message %>'
				)
			})
		)
		.pipe(
			plugins.inject(gulp.src(fileInject, { read: false }), {
				starttag: '// inject:imports',
				endtag: '// endinject',
				relative: true,
				transform: function(filepath) {
					let pathRemoveExtension = filepath.replace(/\.[^.]*$/, '');
					return `@import ./${pathRemoveExtension}`;
				}
			})
		)
		.pipe(gulp.dest(dest));
});
