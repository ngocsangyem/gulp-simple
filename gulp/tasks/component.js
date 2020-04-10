const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const cssDeclarationSorter = require("css-declaration-sorter");
const webpack = require("webpack");
const Fiber = require("fibers");
const { plugins, config, taskTarget, reportError } = require("../utils");

const dirs = config.directories;
const dirsDev = dirs.development;
const dest = `${taskTarget}/${dirsDev.component}`;
const postCssPlugins = [
	autoprefixer({
		grid: true,
	}),
	cssDeclarationSorter({
		order: "concentric-css",
	}),
];

const webpackComponent = require("../../webpack/webpack.component");

gulp.task("componentSASS", () => {
	return gulp
		.src([
			`${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.+(sass|scss)`,
			`!${dirsDev.source}${dirsDev.app}${dirsDev.component}index.+(sass|scss)`,
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError,
			})
		)
		.pipe(
			plugins.sass({
				fiber: Fiber,
				outputStyle: "expanded",
				precision: 10,
			})
		)
		.pipe(plugins.postcss(postCssPlugins))
		.on("error", plugins.notify.onError(config.defaultNotification))
		.pipe(gulp.dest(dest));
});

gulp.task("componentPUG", () => {
	return gulp
		.src([`${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.pug`])
		.pipe(
			plugins.plumber({
				errorHandler: reportError,
			})
		)
		.pipe(
			plugins.pug({
				pretty: "\t",
			})
		)
		.on("error", function (err) {
			plugins.util.log(err);
		})
		.on("error", plugins.notify.onError(config.defaultNotification))
		.pipe(gulp.dest(dest));
});

gulp.task("componentSCRIPT", () => {
	return new Promise((resolve) =>
		webpack(webpackComponent, (err, stats) => {
			if (err) console.log("Webpack", err);
			console.log(
				stats.toString({
					/* stats options */
				})
			);
			resolve();
		})
	);
});
