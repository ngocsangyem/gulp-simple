const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const Fiber = require("fibers");
const gcmq = require("gulp-group-css-media-queries");
const cssDeclarationSorter = require("css-declaration-sorter");

const {
	plugins,
	args,
	config,
	taskTarget,
	browserSync,
	reportError,
	store
} = require("../utils");

const dirs = config.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;
const entries = config.directories.entries;
const dest = `${taskTarget}/${dirsPro.style}`;
const postCssPlugins = [
	autoprefixer({
		grid: true
	}),
	cssDeclarationSorter({
		order: "concentric-css"
	})
];

gulp.task("sass", () => {
	return gulp
		.src(`${dirsDev.source}${dirsDev.app}${entries.css}`)
		.pipe(
			plugins.plumber({
				errorHandler: reportError
			})
		)
		.pipe(
			plugins.if(
				!args.production,
				plugins.sourcemaps.init({
					loadMaps: true
				})
			)
		)
		.pipe(
			plugins.sass({
				fiber: Fiber,
				outputStyle: "expanded",
				precision: 10
			})
		)
		.on("error", function(err) {
			plugins.util.log(err);
		})
		.on("error", plugins.notify.onError(config.defaultNotification))
		.pipe(plugins.postcss(postCssPlugins))
		.pipe(plugins.if(!args.production, gcmq()))
		.pipe(
			plugins.if(
				args.production,
				plugins.cssnano({
					rebase: false
				})
			)
		)
		.pipe(
			plugins.fn((file, enc) => {
				console.log("sass store", store);
			})
		)
		.pipe(plugins.if(!args.production, plugins.sourcemaps.write("./")))
		.pipe(gulp.dest(dest))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});
