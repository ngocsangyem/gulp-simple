import path from 'path';
import sitemap from 'gulp-sitemap';
import fs from 'fs';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = path.join(taskTarget);
	const url = JSON.parse(fs.readFileSync('./seo.json'));
	const seo = url.SEO;

	gulp.task('sitemap', () => {
		return gulp
			.src(
				[
					path.join(taskTarget, '**/*.html'),
					'!' + path.join(taskTarget, '**/404.html'),
					'!' + path.join(taskTarget, '**/403.html'),
					'!' + path.join(taskTarget, '**/400.html'),
					'!' + path.join(taskTarget, '**/500.html'),
					'!' + path.join(taskTarget, '**/502.html'),
					'!' + path.join(taskTarget, '**/503.html')
				],
				{
					read: false
				}
			)
			.pipe(
				sitemap({
					siteUrl: '//' + seo.cfg_url
				})
			)
			.pipe(gulp.dest(dest));
	});
}
