import path from 'path';
import Capitalize from './utils/capitalize';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const entries = config.entries;
	const dest = `${dirs.source}/${dirs.app}/${dirs.component}`;
	const fileInject = [
		`${dirs.source}/${dirs.app}/${dirs.component}/**/*.js`,
		`!${dirs.source}/${dirs.app}/${dirs.component}/index.js`,
		`!${dirs.source}/${dirs.app}/${dirs.component}/**/*.test.js`
	];
	gulp.task('injectJs', () => {
		return gulp
			.src(`${dirs.source}/${dirs.app}/${dirs.component}/index.js`)
			.pipe(
				$.plumber({
					errorHandler: $.notify.onError(
						'Error: <%= error.message %>'
					)
				})
			)
			.pipe(
				$.inject(gulp.src(fileInject, { read: false }), {
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
						// return `import ${dirName}Component from '${pathRemoveExtension}';`;
						return `export * from './${pathRemoveExtension}';`;
					}
				})
			)
			.pipe(gulp.dest(dest));
	});
}
