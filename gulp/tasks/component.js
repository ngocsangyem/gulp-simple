import gulp from "gulp";
import autoprefixer from "autoprefixer";
import cssDeclarationSorter from "css-declaration-sorter";

import {
	plugins,
	args,
	config,
	taskTarget,
	browserSync,
	reportError
} from "../utils";

const dirs = config.directories;
const entries = config.entries;
const dest = `${taskTarget}/${dirs.component}`;
const postCssPlugins = [
	autoprefixer({
		grid: true
	}),
	cssDeclarationSorter({
		order: "concentric-css"
	})
];

gulp.task("componentSASS", () => {
	return gulp
		.src([
			`${dirs.source}${dirs.app}${dirs.pages}${dirs.component}**/*.+(sass|scss)`,
			`!${dirs.source}${dirs.app}${dirs.pages}${dirs.component}index.+(sass|scss)`,
			`${dirs.source}${dirs.app}${dirs.shared}${dirs.component}**/*.+(sass|scss)`,
			`!${dirs.source}${dirs.app}${dirs.shared}${dirs.component}index.+(sass|scss)`
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError
			})
		)
		.on("error", plugins.notify.onError(config.defaultNotification))
		.pipe(gulp.dest(dest));
});

gulp.task("componentPUG", () => {
	return gulp
		.src([
			`${dirs.source}${dirs.app}${dirs.pages}${dirs.component}**/*.pug`,
			`${dirs.source}${dirs.app}${dirs.shared}${dirs.component}**/*.pug`
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError
			})
		)
		.pipe(
			plugins.pug({
				pretty: "\t"
			})
		)
		.on("error", function(err) {
			plugins.util.log(err);
		})
		.on("error", plugins.notify.onError(config.defaultNotification))
		.pipe(gulp.dest(dest));
});

gulp.task("componentSCRIPT", () => {
	return gulp
		.src([
			`${dirs.source}${dirs.app}${dirs.pages}${dirs.component}**/*.+(js|ts)`,
			`!${dirs.source}${dirs.app}${dirs.pages}${dirs.component}**/*.test.+(js|ts)`,
			`!${dirs.source}${dirs.app}${dirs.pages}${dirs.component}index.+(js|ts)`,
			`${dirs.source}${dirs.app}${dirs.shared}${dirs.component}**/*.+(js|ts)`,
			`!${dirs.source}${dirs.app}${dirs.shared}${dirs.component}**/*.test.+(js|ts)`,
			`!${dirs.source}${dirs.app}${dirs.shared}${dirs.component}index.+(js|ts)`
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError
			})
		)
		.pipe(gulp.dest(dest));
});
