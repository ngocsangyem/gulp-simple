const gulp = require("gulp");
const fs = require("fs");

const { plugins, args, cfg, taskTarget, browserSync } = require("../utils");

const dirs = cfg.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;

gulp.task("browserSync", () => {
	browserSync.init({
		open: args.open ? "local" : false,
		port: cfg.port || 3000,
		server: {
			baseDir: taskTarget,
			routes: (() => {
				let routes = {};

				// Map base URL to routes
				routes[cfg.baseUrl] = taskTarget;

				return routes;
			})()
		}
	});

	if (!args.production) {
		// Pug
		gulp.watch(
			[
				`${dirsDev.source}${dirsDev.app}${dirsDev.pages}**/*.+(pug|json)`,
				`${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.+(pug|json)`,
				`${dirsDev.source}${dirsDev.app}seo.json`
			],
			gulp.series("pug:data", "pug")
		).on("unlink", function(path) {
			console.log("TCL: path", path);
			let filePathInBuildDir = path
				.replace(
					`${dirsDev.source}${dirsDev.app}${dirsDev.pages}${dirs.views}**/*`,
					taskTarget
				)
				.replace(".pug", ".html");
			fs.unlink(filePathInBuildDir, err => {
				if (err) throw err;
				console.log(`---------- Delete:  ${filePathInBuildDir}`);
			});
		});

		// Sass
		gulp.watch(
			[
				`${dirsDev.source}${dirsDev.app}${dirsDev.pages}**/*.{sass,scss}`,
				`${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.{sass,scss}`,
				`${dirsDev.source}${dirsDev.app}**/*.{sass,scss}`
			],
			gulp.series("sass")
		);

		gulp.watch(
			[
				`${dirsDev.source}${dirsDev.app}main.js`,
				`${dirsDev.source}${dirsDev.app}${dirsDev.pages}**/*.js`,
				`${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.js`
			],
			gulp.series("scripts")
		);

		// Concat files
		gulp.watch(["./plugins.json"], gulp.parallel("concatCss", "concatJs"));

		// Fonts
		gulp.watch(
			[`${dirsDev.source}${dirsDev.assets}${dirsDev.fonts}**/*`],
			gulp.parallel("fonts")
		);

		// Images
		gulp.watch(
			[
				`${dirsDev.source}${dirsDev.assets}${dirsDev.image}**/*.{jpg,jpeg,gif,svg,png}`
			],
			gulp.parallel("images")
		).on("unlink", function(path) {
			let filePathInBuildDir = path
				.replace(
					`${dirsDev.source}${dirsDev.assets}${dirsDev.image}`,
					`${taskTarget}${dirsPro.image}`
				)
				.replace(
					".+(jpg|jpeg|gif|svg|png)",
					".+(jpg|jpeg|gif|svg|png)"
				);
			fs.unlink(filePathInBuildDir, err => {
				if (err) throw err;
				console.log(`---------- Delete:  ${filePathInBuildDir}`);
			});
		});

		// Watch .html change
		gulp.watch(`${taskTarget}/`).on("change", browserSync.reload);
	}
});
