const fs = require("fs");
const gulp = require("gulp");

const pipe = require("../core/pipe");
const parseHTML = require("../core/parseHTML");

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

function parse() {
	if (!store.pages) {
		store.pages = {};
	}

	return pipe(parseHTML, this, "parseHTML");
}

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
		.pipe(parse())
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
		.pipe(pipe(parse()))
		.pipe(gulp.dest(dest))

		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});
