const gulp = require("gulp");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const dirs = config.directories;
const dest = `${taskTarget}/${dirs.fonts}`;

gulp.task("fonts", () => {
	// console.log(filePath)

	return gulp
		.src(`${dirs.source}${dirs.assets}${dirs.fonts}**/*`)
		.pipe(gulp.dest(dest));
});
