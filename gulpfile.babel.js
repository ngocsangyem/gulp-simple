const gulp = require("gulp");
const path = require("path");
const glob = require("glob");
const {
	KarmaServer,
	args
} = require("./gulp/utils");

glob.sync("./gulp/tasks/**/*.js")
	.filter(function (file) {
		return /\.(js)$/i.test(file);
	})
	.map(function (file) {
		require(file);
	});

gulp.task(
	"serve",
	gulp.series([
		"clean",
		"pug:data",
		"pug",
		gulp.parallel(
			"sass",
			"pug",
			"fonts",
			"images",
			"concatCss",
			"concatJs",
			"scripts",
		),
		"inject",
		"browserSync"
	])
);

gulp.task(
	"build",
	gulp.series([
		"clean",
		"pug",
		gulp.parallel(
			"sass",
			"fonts",
			"images",
			"concatCss",
			"concatJs",
			"scripts"
		),
		"inject",
		"zip",
		"rev",
		"sitemap",
		"author",
		"size",
		"done"
	])
);

gulp.task(
	"component",
	gulp.series([
		"clean",
		"pug",
		gulp.parallel(
			"sass",
			"fonts",
			"images",
			"concatCss",
			"concatJs",
			"scripts",
		),
		gulp.parallel("componentSASS", "componentPUG", "componentSCRIPT"),
		"inject",
		"zip",
		"rev",
		"sitemap",
		"author",
		"size",
		"done"
	])
);

// Testing
gulp.task(
	"test",
	gulp.series("eslint", done => {
		new KarmaServer({
				configFile: path.join(__dirname, "/karma.conf.js"),
				singleRun: !args.watch,
				autoWatch: args.watch
			},
			done
		).start();
	})
);
