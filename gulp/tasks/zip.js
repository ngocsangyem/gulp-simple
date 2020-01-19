const gulp = require("gulp");
const path = require("path");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

gulp.task("zip", () => {
	return gulp
		.src(`${taskTarget}/**/*`)
		.pipe(plugins.zip(`${taskTarget}.zip`))
		.pipe(gulp.dest("./"));
});
