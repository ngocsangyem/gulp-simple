const gulp = require("gulp");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const dirs = config.directories;

gulp.task("eslint", () => {
	gulp.src(`${dirs.source}**/*.js`)
		.pipe(browserSync.reload({ stream: true, once: true }))
		.pipe(
			plugins.eslint({
				configFile: "./eslintrc.json"
			})
		)
		.pipe(plugins.eslint.format())
		.pipe(plugins.if(!browserSync.active, plugins.eslint.failAfterError()))
		.on("error", function() {
			if (!browserSync.active) {
				process.exit(1);
			}
		});
});
