const gulp = require("gulp");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const dirs = config.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;
const dest = `${taskTarget}/${dirsPro.fonts}`;

gulp.task("fonts", () => {
	// console.log(filePath)

	return gulp
		.src(`${dirsDev.source}${dirsDev.assets}${dirsDev.fonts}**/*`)
		.pipe(gulp.dest(dest));
});
