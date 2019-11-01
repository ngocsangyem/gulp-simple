import gulp from 'gulp';
import colors from 'colors';

import { plugins, args, config, taskTarget, browserSync } from '../utils';

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
