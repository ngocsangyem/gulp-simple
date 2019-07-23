import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = `${dirs.source}/${dirs.app}/${dirs.css}`;
	const entries = config.entries;
	const fileInject = `${dirs.source}/${dirs.app}/${
		dirs.component
	}/**/*.{sass,scss}`;

	gulp.task('injectSass', () => {
		return gulp
			.src(`${dirs.source}/${dirs.app}/${dirs.css}/${entries.css}`)
			.pipe(
				$.plumber({
					errorHandler: $.notify.onError(
						'Error: <%= error.message %>'
					)
				})
			)
			.pipe(
				$.inject(gulp.src(fileInject, { read: false }), {
					starttag: '// inject:imports',
					endtag: '// endinject',
					relative: true,
					transform: function(filepath) {
						let pathRemoveExtension = filepath.replace(
							/\.[^.]*$/,
							''
						);
						return `@import ${pathRemoveExtension}`;
					}
				})
			)
			.pipe(
				$.debug({
					title: 'Injected:'
				})
			)
			.pipe(gulp.dest(dest));
	});
}
