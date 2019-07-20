import path from 'path';
import fs from 'fs';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const entries = config.entries;
	const dest = path.join(taskTarget);

	gulp.task('pug', () => {
		return gulp
			.src([
				path.join(dirs.source, dirs.app, dirs.views, '**/*.pug'),
				'!' +
					path.join(
						dirs.source,
						dirs.app,
						dirs.views,
						'{**/_*,**/_*/**}'
					)
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
					return JSON.parse(fs.readFileSync('./seo.json'));
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
			.pipe(
				$.debug({
					title: 'Compiles:'
				})
			)
			.pipe(gulp.dest(dest))
			.pipe(
				browserSync.reload({
					stream: true
				})
			);
	});
}
