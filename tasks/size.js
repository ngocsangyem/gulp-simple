import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = path.join(taskTarget);

	gulp.task('size', () => {
		return gulp
			.src(path.join(taskTarget, '**/*'))
			.pipe(
				$.size({
					gzip: true
				})
			)
			.pipe(gulp.dest(dest))
			.pipe(
				$.notify({
					onLast: true,
					message: () => `Total size ${s.prettySize}`
				})
			);
	});
}
