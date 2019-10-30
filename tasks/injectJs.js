import path from 'path';
import Capitalize from './utils/capitalize';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const entries = config.entries;
	const dest = `${dirs.source}/${dirs.app}/${dirs.scripts}`;
	const fileInject = `${dirs.source}/${dirs.app}/${dirs.component}/**/*.js`;
	gulp.task('injectJs', () => {
		return gulp
			.src(`${dirs.source}/${dirs.app}/${dirs.scripts}/${entries.js}`)
			.pipe(
				$.plumber({
					errorHandler: $.notify.onError(
						'Error: <%= error.message %>'
					)
				})
			)
			.pipe(
				$.inject(
					gulp.src(
						[
							fileInject,
							`!${dirs.source}/${dirs.app}/${dirs.component}/**/*.test.js`
						],
						{ read: false }
					),
					{
						starttag: '// inject:jsComponentFile',
						endtag: '// endinject',
						relative: true,
						transform: function(filepath) {
							let dirName = Capitalize(
								path.basename(path.dirname(filepath))
							);
							let fileName = Capitalize(path.basename(filepath));
							let pathRemoveExtension = filepath.replace(
								/\.[^.]*$/,
								''
							);
							return `import ${dirName}Component from '${pathRemoveExtension}';`;
						}
					}
				)
			)
			.pipe(gulp.dest(dest));
	});
}
