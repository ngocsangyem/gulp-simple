const gulp = require("gulp");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const dirs = config.directories;
const dest = `${taskTarget}/${dirs.images}`;

gulp.task("images", () => {
	return gulp
		.src(
			`${dirs.source}${dirs.assets}${dirs.images}**/*.{jpg,jpeg,gif,svg,png}`
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
