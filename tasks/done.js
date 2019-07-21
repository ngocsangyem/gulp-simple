import path from 'path';
import fs from 'fs';
import colors from 'colors';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	let banner = [
		' ',
		'/////////////////////////////////////',
		'// ngocsangyem',
		'/////////////////////////////////////',
		' '
	].join('\n');

	gulp.task('done', done => {
		return console.log(
			colors.rainbow('\nCongratulations!\n'),
			colors.green(banner),
			colors.magenta('\nBuild Finished! Press Ctrl+C to exit.')
		);
	});
}
