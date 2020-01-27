const gulp = require("gulp");

const {
	plugins,
	args,
	config,
	taskTarget,
	browserSync
} = require("../utils");

const dirs = config.directories;
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
				plugins.imagemin()
			)
		)
		.pipe(gulp.dest(dest));
});
