import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = path.join(taskTarget);

	gulp.task('rev', () => {
		return gulp
			.src(path.join(taskTarget, '**/*.{css,js}'))
			.pipe($.rev())
			.pipe(gulp.dest(dest))
			.pipe($.rev.manifest())
			.pipe(gulp.dest(dest));
	});
}
