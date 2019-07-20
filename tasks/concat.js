import path from 'path';
import fs from 'fs';
import strip from 'gulp-strip-comments';
import stripCssComments from 'gulp-strip-css-comments';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const url = JSON.parse(fs.readFileSync('./plugins.json'));
	const destJs = path.join(taskTarget, dirs.scripts);
	const destCss = path.join(taskTarget, dirs.css);

	gulp.task('concatJs', () => {
		return gulp
			.src(url.scripts)
			.pipe(strip())
			.pipe($.concat('core.js'))
			.pipe($.terser())
			.pipe(
				$.debug({
					title: 'Concat:'
				})
			)
			.pipe(gulp.dest(destJs));
	});

	gulp.task('concatCss', () => {
		return gulp
			.src(url.styles)
			.pipe(stripCssComments())
			.pipe($.concat('core.css'))
			.pipe($.cssnano())
			.pipe(
				$.debug({
					title: 'Concat:'
				})
			)
			.pipe(gulp.dest(destCss));
	});
}
