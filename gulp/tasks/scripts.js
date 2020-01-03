const gulp = require("gulp");
const webpackstream = require("webpack-stream");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const webpackConfig = require("../webpack.config");

const dirs = config.directories;
const entries = config.directories.entries;

gulp.task("scripts", () => {
	return gulp
		.src(`${dirs.source}${dirs.app}${entries.script}`)
		.pipe(webpackstream(webpackConfig))
		.pipe(gulp.dest(`${taskTarget}/${dirs.scripts}`));
});
