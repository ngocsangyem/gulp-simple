import path from 'path';
import del from 'del';
import gulp from 'gulp';

import { plugins, args, config, taskTarget, browserSync } from '../utils';

const dirs = config.directories;

// Clean
gulp.task('clean', () =>
	del([
		path.join(dirs.destination),
		path.join(dirs.temporary),
		path.join(dirs.destination + '.zip')
	])
);
