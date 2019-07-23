import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = `${taskTarget}`;

	gulp.task('size', () => {
		let sz = $.size({
			gzip: true
		});
		return gulp
			.src(`${taskTarget}/**/*`)
			.pipe(sz)
			.pipe(gulp.dest(dest))
			.pipe(
				$.sizereport({
					gzip: true,
					'*': {
						maxSize: 100000
					}
				})
			)
			.pipe(
				$.notify({
					onLast: true,
					message: () => `Total size ${sz.prettySize}`
				})
			);
	});
}
