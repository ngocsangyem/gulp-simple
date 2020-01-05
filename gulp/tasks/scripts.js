const gulp = require("gulp");
const webpackstream = require("webpack-stream");

const { plugins, args, cfg, taskTarget, browserSync } = require("../utils");

const webpackcfg = require("../webpack.config");

const dirs = cfg.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;
const entries = cfg.directories.entries;

gulp.task("scripts", () => {
	return gulp
		.src(`${dirsDev.source}${dirsDev.app}${entries.script}`)
		.pipe(webpackstream(webpackcfg))
		.pipe(gulp.dest(`${taskTarget}/${dirsPro.script}`));
});
