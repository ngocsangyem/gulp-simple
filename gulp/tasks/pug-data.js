const gulp = require("gulp");
const path = require("path");
const merge = require("gulp-merge-json");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const { RemoveExtension } = require("../helpers/remove-extension");
const { CapitalizeWord } = require("../helpers/capitalize");

const dirs = config.directories;
const dest = path.join(taskTarget);
const entries = config.directories.entries;

gulp.task("pug:data", () => {
	return gulp
		.src([
			`${dirs.source}${dirs.app}${dirs.component}**/*.json`,
			`${dirs.source}${dirs.app}${dirs.pages}**/*.json`,
			`${dirs.source}${dirs.app}seo.json`
		])
		.pipe(
			merge({
				fileName: entries.data,
				edit: (json, file) => {
					// Extract the filename and strip the extension
					const filename = path.basename(file.path),
						primaryKey = RemoveExtension(CapitalizeWord(filename));

					// Set the filename as the primary key for our JSON data
					const data = {};
					data[primaryKey] = json;

					return data;
				}
			})
		)
		.pipe(gulp.dest(`${dirs.source}${dirs.app}data`));
});
