const gulp = require("gulp");
const webpackstream = require("webpack-stream");
const webpack = require("webpack");

const { config, taskTarget } = require("../utils");

const webpackconfig = require("../../webpack/webpack.config");

const dirs = config.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;
const entries = config.directories.entries;

gulp.task("scripts", () => {
	return gulp
		.src(`${dirsDev.source}${dirsDev.app}${entries.script}`)
		.pipe(webpackstream(webpackconfig))
		.pipe(gulp.dest(`${taskTarget}/${dirsPro.script}`));
	// return new Promise(resolve =>
	// 	webpack(webpackconfig, (err, stats) => {
	// 		if (err) console.log("Webpack", err);
	// 		console.log(
	// 			stats.toString({
	// 				/* stats options */
	// 			})
	// 		);
	// 		resolve();
	// 	})
	// );
});
