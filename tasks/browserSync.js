import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;

	gulp.task('browserSync', () => {
		browserSync.init({
			open: 'local',
			port: config.port || 3000,
			server: {
				baseDir: taskTarget,
				routes: (() => {
					let routes = {};

					// Map base URL to routes
					routes[config.baseUrl] = taskTarget;

					return routes;
				})()
			}
		});

		// Watch

		// Pug
		gulp.watch(
			[
				path.join(dirs.source, dirs.app, dirs.component, '**/*.pug'),
				path.join(dirs.source, dirs.app, dirs.views, '**/*.pug'),
				'./seo.json'
			],
			gulp.series('pug')
		).on('unlink', function(path) {
			let filePathInBuildDir = path
				.replace(
					path.join(dirs.source, dirs.app, dirs.views),
					taskTarget
				)
				.replace('.pug', '.html');
			fs.unlink(filePathInBuildDir, err => {
				if (err) throw err;
				console.log(`---------- Delete:  ${filePathInBuildDir}`);
			});
		});

		// Sass
		gulp.watch(
			[
				path.join(
					dirs.source,
					dirs.app,
					dirs.component,
					'**/*.+(sass|scss)'
				),
				path.join(dirs.source, dirs.app, dirs.css, '**/*.+(sass|scss)')
			],
			gulp.series('sass')
		);

		// Inject tasks
		gulp.watch(
			[
				path.join(
					dirs.source,
					dirs.app,
					dirs.component,
					'**/*.+(sass|scss)'
				)
			],
			{ events: ['add'] },
			gulp.series('injectSass')
		);
		gulp.watch(
			[path.join(dirs.source, dirs.app, dirs.component, '**/*.js')],
			{ events: ['add'] },
			gulp.series('injectJs')
		);

		// Concat files
		gulp.watch(['./plugins.json'], gulp.parallel('concatCss', 'concatJs'));

		// Fonts
		gulp.watch(
			[path.join(dirs.source, dirs.assets, dirs.fonts, '**/*')],
			gulp.parallel('fonts')
		);

		// Images
		gulp.watch(
			[path.join(dirs.source, dirs.assets, dirs.images, '**/*')],
			gulp.parallel('images')
		);

		// Watch .html change
		gulp.watch([taskTarget]).on('change', browserSync.reload);
	});
}
