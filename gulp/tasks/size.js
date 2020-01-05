const gulp = require("gulp");

const { plugins, args, cfg, taskTarget, browserSync } = require("../utils");

const dest = `${taskTarget}`;

gulp.task("size", () => {
	let sz = plugins.size({
		gzip: true
	});
	return gulp
		.src(`${taskTarget}/**/*`)
		.pipe(sz)
		.pipe(gulp.dest(dest))
		.pipe(
			plugins.sizereport({
				gzip: true,
				"*": {
					maxSize: 100000
				}
			})
		)
		.pipe(
			plugins.notify({
				onLast: true,
				message: () => `Total size ${sz.prettySize}`
			})
		);
});
