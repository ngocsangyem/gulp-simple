import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const auth = config.author;
	const dest = path.join(taskTarget);

	let banner = [
		'/*',
		' ////////////////////////////////////////////////////////',
		' // <%= auth.name %>',
		' // @version v<%= auth.version %>',
		' // @link <%= auth.link %>',
		' // @license <%= auth.license %>',
		' // @<%= auth.coding %> - <%= auth.phone %>',
		' // @<%= auth.email %>',
		' ////////////////////////////////////////////////////////',
		'*/'
	].join('\n');

	gulp.task('author', () => {
		return gulp
			.src(path.join(taskTarget, '**/*.+(css|js)'))
			.pipe(
				$.header(banner, {
					auth: auth
				})
			)
			.pipe(gulp.dest(dest));
	});
}
