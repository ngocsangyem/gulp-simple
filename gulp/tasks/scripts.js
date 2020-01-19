const gulp = require("gulp");
const webpackstream = require("webpack-stream");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const webpackconfig = require("../webpack.config");

const dirs = config.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;
const entries = config.directories.entries;

gulp.task("scripts", () => {
	return gulp
		.src(`${dirsDev.source}${dirsDev.app}${entries.script}`)
		.pipe(webpackstream(webpackconfig))
		.pipe(gulp.dest(`${taskTarget}/${dirsPro.script}`));
});
