const fs = require("fs");
const gulp = require("gulp");

const {
	plugins,
	args,
	config,
	taskTarget,
	browserSync,
	reportError
} = require("../utils");

const dirs = config.directories;
const entries = config.directories.entries;
const dest = `${taskTarget}`;

gulp.task("pug", () => {
	return gulp
		.src([
			`${dirs.source}${dirs.app}${dirs.pages}**/*.pug`,
			`!${dirs.source}${dirs.app}${dirs.pages}{**/_*,**/_*/**}`
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError
			})
		)
		.pipe(
			plugins.data(function(file) {
				return JSON.parse(
					fs.readFileSync(
						`./${dirs.source}${dirs.app}${dirs.data}${entries.data}`
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
