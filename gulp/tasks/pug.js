const fs = require("fs");
const gulp = require("gulp");

const {
	plugins,
	args,
	cfg,
	taskTarget,
	browserSync,
	reportError
} = require("../utils");

const dirs = cfg.directories;
const dirsDev = dirs.development;
const entries = cfg.directories.entries;
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
		.on("error", plugins.notify.onError(cfg.defaultNotification))
		.pipe(gulp.dest(dest))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});
