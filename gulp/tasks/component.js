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
const dirsPro = dirs.production;
const dirsDev = dirs.development;
const entries = config.directories.entries;
const dest = `${taskTarget}/${dirsPro.component}`;
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
			`${dirsDev.source}${dirsDev.app}${dirsDev.pages}**/*.+(sass|scss)`,
			`!${dirsDev.source}${dirsDev.app}${dirsDev.pages}index.+(sass|scss)`,
			`${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.+(sass|scss)`,
			`!${dirsDev.source}${dirsDev.app}${dirsDev.component}index.+(sass|scss)`
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
			`${dirsDev.source}${dirsDev.app}${dirsDev.pages}**/*.pug`,
			`${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.pug`
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
			`${dirsDev.source}${dirsDev.app}${dirsDev.pages}**/*.+(js|ts)`,
			`!${dirsDev.source}${dirsDev.app}${dirsDev.pages}**/*.test.+(js|ts)`,
			`!${dirsDev.source}${dirsDev.app}${dirsDev.pages}index.+(js|ts)`,
			`${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.+(js|ts)`,
			`!${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.test.+(js|ts)`,
			`!${dirsDev.source}${dirsDev.app}${dirsDev.component}index.+(js|ts)`
		])
		.pipe(
			plugins.plumber({
				errorHandler: reportError
			})
		)
		.pipe(gulp.dest(dest));
});
