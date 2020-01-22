const gulp = require("gulp");
const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const pipe = require("../core/pipe");
const inject = require("../core/inject");

const dirs = config.directories;
const dest = `${taskTarget}`;

gulp.task("inject", () => {
	return gulp
		.src(`${taskTarget}/*.html`)
		.pipe(pipe(inject, this, "FinalInjects"))
		.pipe(gulp.dest(dest));
});
