import Fiber from 'fibers';
import autoprefixer from 'autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cssDeclarationSorter from 'css-declaration-sorter';

export default function (gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const entries = config.entries;
	const dest = `${taskTarget}/${dirs.component}`;
	const postCssPlugins = [
		autoprefixer({
			grid: true
		}),
		cssDeclarationSorter({
			order: 'concentric-css'
		})
	];

	gulp.task('componentSASS', () => {
		return gulp
			.src(`${dirs.source}/${dirs.app}/${dirs.component}/**/*.sass`)
			.pipe(
				$.plumber({
					errorHandler: $.notify.onError(
						'Error: <%= error.message %>'
					)
				})
			)
			.pipe(
				$.sass({
					fiber: Fiber,
					outputStyle: 'expanded',
					precision: 10
				})
			)
			.on('error', function (err) {
				$.util.log(err);
			})
			.on('error', $.notify.onError(config.defaultNotification))
			.pipe($.postcss(postCssPlugins))
			.pipe(gcmq())
			.pipe($.cssnano({
				rebase: false
			}))
			.pipe(gulp.dest(dest))
	});
	gulp.task('componentPUG', () => {
		return gulp
			.src(`${dirs.source}/${dirs.app}/${dirs.component}/**/*.pug`)
			.pipe(
				$.plumber({
					errorHandler: $.notify.onError(
						'Error: <%= error.message %>'
					)
				})
			)
			.pipe(
				$.pug({
					pretty: '\t'
				})
			)
			.on('error', function (err) {
				$.util.log(err);
			})
			.on('error', $.notify.onError(config.defaultNotification))
			.pipe(gulp.dest(dest))
	});

	gulp.task('componentSCRIPT', () => {
		return gulp
			.src([
				`${dirs.source}/${dirs.app}/${dirs.component}/**/*.js`,
				`!${dirs.source}/${dirs.app}/${dirs.component}/**/*.test.js`
			])
			.pipe(
				$.plumber({
					errorHandler: $.notify.onError(
						'Error: <%= error.message %>'
					)
				})
			)
			.pipe($.babel({
				presets: ['@babel/env']
			}))
			.pipe($.terser())
			.pipe(gulp.dest(dest))
	})
}
