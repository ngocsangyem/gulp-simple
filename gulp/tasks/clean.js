const path = require("path");
const del = require("del");
const gulp = require("gulp");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const dirs = config.directories;

// Clean
gulp.task("clean", () =>
	del([
		path.join(dirs.destination),
		path.join(dirs.temporary),
		path.join(dirs.destination + ".zip")
	])
);
