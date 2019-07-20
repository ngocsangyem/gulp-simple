import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = path.join(taskTarget, dirs.fonts);

	gulp.task('fonts', () => {
		// console.log(filePath)

		return gulp
			.src(path.join(dirs.source, dirs.assets, dirs.fonts, '**/*'))
			.pipe(
				$.debug({
					title: 'Add :'
				})
			)
			.pipe(gulp.dest(dest));
	});
}
