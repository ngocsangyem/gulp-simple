import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = `${taskTarget}/${dirs.images}`;

	gulp.task('images', () => {
		return gulp
			.src(
				`${dirs.source}/${dirs.assets}/${
					dirs.images
				}/**/*.{jpg,jpeg,gif,svg,png}`
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
			.pipe(gulp.dest(dest));
	});
}
