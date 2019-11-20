import gulp from "gulp";
import path from "path";
import webpackstream from "webpack-stream";
import webpack from "webpack";

import { plugins, args, config, taskTarget, browserSync } from "../utils";

import webpackConfig from "../webpack.config";

const dirs = config.directories;
const entries = config.entries;

gulp.task("scripts", () => {
	return gulp
		.src(`${dirs.source}${dirs.app}${entries.script}`)
		.pipe(webpackstream(webpackConfig))
		.pipe(gulp.dest(`${taskTarget}/${dirs.scripts}`));
});
