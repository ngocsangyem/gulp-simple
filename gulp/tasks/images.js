const gulp = require("gulp");

const { plugins, args, cfg, taskTarget, browserSync } = require("../utils");

const dirs = cfg.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;
const dest = `${taskTarget}/${dirsPro.image}`;

gulp.task("images", () => {
	return gulp
		.src(
			`${dirsDev.source}${dirsDev.assets}${dirsDev.image}**/*.{jpg,jpeg,gif,svg,png}`
		)
		.pipe(plugins.if(!args.production, plugins.cached()))
		.pipe(
			plugins.if(
				args.production,
				plugins.imagemin(
					[plugins.imagemin.jpegtran({ progressive: true })],
					{
						verbose: true,
						interlaced: true,
						progressive: true,
						optimizationLevel: 5
					}
				)
			)
		)
		.pipe(gulp.dest(dest));
});
