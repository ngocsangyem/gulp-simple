import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = path.join(taskTarget);

	gulp.task('zip', () => {
		return gulp
			.src(`${taskTarget}/**/*`)
			.pipe($.zip(`${taskTarget}.zip`))
			.pipe(gulp.dest('./'));
	});
}
