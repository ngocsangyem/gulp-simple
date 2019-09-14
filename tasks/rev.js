import path from 'path';

export default function (gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = `${taskTarget}`;

	gulp.task('rev', () => {
		return gulp
			.src([
				`${taskTarget}/styles/*.css`,
				`${taskTarget}/scripts/*.js`
			])
			.pipe($.rev())
			.pipe(gulp.dest(dest))
			.pipe($.rev.manifest('manifest.json'))
			.pipe(gulp.dest(dest));
	});
}
