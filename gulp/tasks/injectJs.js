import gulp from 'gulp';
import path from 'path';

import { plugins, args, config, taskTarget, browserSync } from '../utils';

import Capitalize from '../helpers/capitalize';

const dirs = config.directories;
const entries = config.entries;
const dest = `${dirs.source}${dirs.app}${dirs.component}`;
const fileInject = [
	`${dirs.source}${dirs.app}${dirs.component}**/*.+(js|ts)`,
	`!${dirs.source}${dirs.app}${dirs.component}index.+(js|ts)`,
	`!${dirs.source}${dirs.app}${dirs.component}**/*.test.+(js|ts)`
];
gulp.task('injectJs', () => {
	return gulp
		.src(`${dirs.source}${dirs.app}${dirs.component}index.+(js|ts)`)
		.pipe(
			plugins.plumber({
				errorHandler: plugins.notify.onError(
					'Error: <%= error.message %>'
				)
			})
		)
		.pipe(
			plugins.inject(gulp.src(fileInject, { read: false }), {
				starttag: '// inject:jsComponentFile',
				endtag: '// endinject',
				relative: true,
				transform: function(filepath) {
					let dirName = Capitalize(
						path.basename(path.dirname(filepath))
					);
					let fileName = Capitalize(path.basename(filepath));
					let pathRemoveExtension = filepath.replace(/\.[^.]*$/, '');
					// return `import ${dirName}Component from '${pathRemoveExtension}';`;
					return `export * from './${pathRemoveExtension}';`;
				}
			})
		)
		.pipe(gulp.dest(dest));
});
