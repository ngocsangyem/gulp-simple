const fs = require("fs");
const gulp = require("gulp");
const path = require("path");

const {
	plugins,
	args,
	config,
	taskTarget,
	browserSync,
	reportError,
	paths,
	store
} = require("../utils");

const parseHTML = require("../core/parseHTML");

const dirs = config.directories;
const dirsDev = dirs.development;
const entries = config.directories.entries;
const dest = `${taskTarget}`;

gulp.task("pug", () => {
	return gulp
		.src([
			`${dirsDev.source}${dirsDev.app}${dirsDev.pages}**/*.pug`,
			`!${dirsDev.source}${dirsDev.app}${dirsDev.pages}{**/_*,**/_*/**}`
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError
			})
		)
		.pipe(
			plugins.fn((file, enc) => {
				if (!store.pages) {
					store.pages = {};
				}
				parseHTML(file);
			})
		)
		.pipe(
			plugins.data(function(file) {
				return JSON.parse(
					fs.readFileSync(
						`./${dirsDev.source}${dirsDev.app}${dirsDev.data}${entries.data}`
					)
				);
			})
		)
		.pipe(
			plugins.pug({
				pretty: "\t"
			})
		)
		.pipe(
			plugins.rename(function(path) {
				path.basename = path.basename.replace(/\.[^.]*$/, "");
				path.dirname = "";
			})
		)
		.on("error", function(err) {
			plugins.util.log(err);
		})
		.on("error", plugins.notify.onError(config.defaultNotification))
		.pipe(gulp.dest(dest))

		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});
