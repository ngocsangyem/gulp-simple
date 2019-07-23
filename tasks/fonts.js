import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = `${taskTarget}/${dirs.fonts}`;

	gulp.task('fonts', () => {
		// console.log(filePath)

		return (
			gulp
				.src(`${dirs.source}/${dirs.assets}/${dirs.fonts}/**/*`)
				.pipe(
					$.debug({
						title: 'Add :'
					})
				)
				// .pipe(
				// 	$.rename(function(filepath) {
				// 		// Remove 'source' directory as well as prefixed folder underscores
				// 		// Ex: 'src/_scripts' --> '/scripts'
				// 		filepath.dirname = filepath.dirname
				// 			.replace(dirs.source, '')
				// 			.replace(dirs.assets, '')
				// 			.replace('_', '');
				// 	})
				// )
				.pipe(gulp.dest(dest))
		);
	});
}
