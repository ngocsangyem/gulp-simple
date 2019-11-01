import gulp from 'gulp';
import path from 'path';
import glob from 'glob';
import { KarmaServer, args } from './gulp/utils';

glob.sync('./gulp/tasks/**/*.js')
	.filter(function(file) {
		return /\.(js)$/i.test(file);
	})
	.map(function(file) {
		require(file);
	});

gulp.task(
	'serve',
	gulp.series([
		'clean',
		'injectSass',
		'injectJs',
		'pug:data',
		gulp.parallel(
			'sass',
			'pug',
			'browserify',
			'fonts',
			'images',
			'concatCss',
			'concatJs'
		),
		'browserSync'
	])
);

gulp.task(
	'build',
	gulp.series([
		'clean',
		gulp.parallel(
			'pug',
			'sass',
			'fonts',
			'images',
			'concatCss',
			'concatJs',
			'browserify'
		),
		'zip',
		'rev',
		'sitemap',
		'author',
		'size',
		'done'
	])
);

gulp.task(
	'component',
	gulp.series([
		'clean',
		gulp.parallel(
			'pug',
			'sass',
			'fonts',
			'images',
			'concatCss',
			'concatJs',
			'browserify'
		),
		gulp.parallel('componentSASS', 'componentPUG', 'componentSCRIPT'),
		'zip',
		'rev',
		'sitemap',
		'author',
		'size',
		'done'
	])
);

// Default task
// gulp.task('default', gulp.series('clean', 'build'));

// Testing
gulp.task(
	'test',
	gulp.series('eslint', done => {
		new KarmaServer(
			{
				configFile: path.join(__dirname, '/karma.conf.js'),
				singleRun: !args.watch,
				autoWatch: args.watch
			},
			done
		).start();
	})
);
