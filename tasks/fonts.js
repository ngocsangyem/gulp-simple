import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = `${taskTarget}/${dirs.fonts}`;

	gulp.task('fonts', () => {
		// console.log(filePath)

		return gulp
			.src(`${dirs.source}/${dirs.assets}/${dirs.fonts}/**/*`)
			.pipe(gulp.dest(dest));
	});
}
