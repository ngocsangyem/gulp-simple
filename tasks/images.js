import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = path.join(taskTarget, dirs.images);

	gulp.task('images', () => {
		return gulp
			.src(
				path.join(
					dirs.source,
					dirs.assets,
					dirs.images,
					'**/*+(jpg|jpeg|gif|svg|png)'
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
			.pipe(
				$.rename(function(filepath) {
					// Remove 'source' directory as well as prefixed folder underscores
					// Ex: 'src/_scripts' --> '/scripts'
					filepath.dirname = filepath.dirname
						.replace(dirs.source, '')
						.replace(dirs.assets, '')
						.replace('_', '');
				})
			)
			.pipe(gulp.dest(dest));
	});
}
