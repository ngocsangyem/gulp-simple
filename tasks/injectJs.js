import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const entries = config.entries;
	const dest = path.join(dirs.source, dirs.app, dirs.scripts);
	const fileInject = path.join(
		dirs.source,
		dirs.app,
		dirs.component,
		'**/*.js'
	);
	gulp.task('injectJs', () => {
		return gulp
			.src(path.join(dirs.source, dirs.app, dirs.scripts, entries.js))
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
						let pathArr = filepath.split('/').slice(2, 4);
						let pathRemoveExtension = filepath.replace(
							/\.[^.]*$/,
							''
						);
						let upperCasePathName = pathArr.map(
							path =>
								path.charAt(0).toUpperCase() + path.substr(1)
						);
						let finalPath = upperCasePathName
							.join('')
							.replace(/[\W_js]/g, '');

						return `import ${finalPath} from '${pathRemoveExtension}'`;
					}
				})
			)
			.pipe(gulp.dest(dest));
	});
}
