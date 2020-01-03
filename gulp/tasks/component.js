const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const cssDeclarationSorter = require("css-declaration-sorter");

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
			`${dirs.source}${dirs.app}${dirs.pages}**/*.+(sass|scss)`,
			`!${dirs.source}${dirs.app}${dirs.pages}index.+(sass|scss)`,
			`${dirs.source}${dirs.app}${dirs.component}**/*.+(sass|scss)`,
			`!${dirs.source}${dirs.app}${dirs.component}index.+(sass|scss)`
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
			`${dirs.source}${dirs.app}${dirs.pages}**/*.pug`,
			`${dirs.source}${dirs.app}${dirs.component}**/*.pug`
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
			`${dirs.source}${dirs.app}${dirs.pages}**/*.+(js|ts)`,
			`!${dirs.source}${dirs.app}${dirs.pages}**/*.test.+(js|ts)`,
			`!${dirs.source}${dirs.app}${dirs.pages}index.+(js|ts)`,
			`${dirs.source}${dirs.app}${dirs.component}**/*.+(js|ts)`,
			`!${dirs.source}${dirs.app}${dirs.component}**/*.test.+(js|ts)`,
			`!${dirs.source}${dirs.app}${dirs.component}index.+(js|ts)`
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError
			})
		)
		.pipe(gulp.dest(dest));
});
