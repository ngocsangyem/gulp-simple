const path = require("path");
const del = require("del");
const gulp = require("gulp");

const { plugins, args, cfg, taskTarget, browserSync } = require("../utils");

const dirs = cfg.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;

// Clean
gulp.task("clean", () =>
	del([
		path.join(dirsPro.destination),
		path.join(dirsDev.temporary),
		path.join(dirsPro.destination + ".zip")
	])
);
