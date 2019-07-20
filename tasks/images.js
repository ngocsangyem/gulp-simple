import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = path.join(taskTarget, dirs.images);

	gulp.task('images', () => {
		// console.log(filePath)

		return gulp
			.src(
				path.join(
					dirs.source,
					dirs.assets,
					dirs.images,
					'**/*.+(jpg|jpeg|gif|svg|png)'
				)
			)
			.pipe(
				$.if(
					args.production,
					$.imagemin([
						$.imagemin.jpegtran({ progressive: true }),
						$.imagemin.svgo({
							plugins: [{ removeViewBox: false }]
						})
					])
				)
			)
			.pipe(
				$.debug({
					title: 'Add :'
				})
			)
			.pipe(gulp.dest(dest));
	});
}
