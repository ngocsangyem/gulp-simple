import path from 'path';
import fs from 'fs';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const entries = config.entries;
	const dest = `${taskTarget}`;

	gulp.task('pug', () => {
		return gulp
			.src([
				`${dirs.source}/${dirs.app}/${dirs.views}/**/*.pug`,
				`!${dirs.source}/${dirs.app}/${dirs.views}/{**/_*,**/_*/**}`
			])
			.pipe(
				$.plumber({
					errorHandler: $.notify.onError(
						'Error: <%= error.message %>'
					)
				})
			)
			.pipe(
				$.data(function(file) {
					return JSON.parse(
						fs.readFileSync('./src/app/data/data.json')
					);
				})
			)
			.pipe(
				$.pug({
					pretty: '\t'
				})
			)
			.on('error', function(err) {
				$.util.log(err);
			})
			.on('error', $.notify.onError(config.defaultNotification))
			.pipe(gulp.dest(dest))
			.pipe(
				browserSync.reload({
					stream: true
				})
			);
	});
}
