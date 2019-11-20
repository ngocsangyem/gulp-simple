import gulp from "gulp";
import fs from "fs";

import { plugins, args, config, taskTarget, browserSync } from "../utils";

const dirs = config.directories;

gulp.task("browserSync", () => {
	browserSync.init({
		open: args.open ? "local" : false,
		port: config.port || 3000,
		server: {
			baseDir: taskTarget,
			routes: (() => {
				let routes = {};

				// Map base URL to routes
				routes[config.baseUrl] = taskTarget;

				return routes;
			})()
		}
	});

	if (!args.production) {
		// Pug
		gulp.watch(
			[
				`${dirs.source}${dirs.app}${dirs.pages}**/*.+(pug|json)`,
				`${dirs.source}${dirs.app}${dirs.shared}**/*.+(pug|json)`,
				"./seo.json"
			],
			gulp.series("pug:data", "pug")
		).on("unlink", function(path) {
			let filePathInBuildDir = path
				.replace(
					`${dirs.source}${dirs.app}${dirs.pages}${dirs.views}**/*`,
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
				`${dirs.source}${dirs.app}${dirs.pages}**/*.{sass,scss}`,
				`${dirs.source}${dirs.app}${dirs.shared}**/*.{sass,scss}`,
				`${dirs.source}${dirs.app}**/*.{sass,scss}`
			],
			gulp.series("sass")
		);

		gulp.watch(
			[
				`${dirs.source}${dirs.app}main.js`,
				`${dirs.source}${dirs.app}${dirs.pages}**/*.js`,
				`${dirs.source}${dirs.app}${dirs.shared}**/*.js`
			],
			gulp.series("scripts")
		);

		// Concat files
		gulp.watch(["./plugins.json"], gulp.parallel("concatCss", "concatJs"));

		// Fonts
		gulp.watch(
			[`${dirs.source}${dirs.assets}${dirs.fonts}**/*`],
			gulp.parallel("fonts")
		);

		// Images
		gulp.watch(
			[
				`${dirs.source}${dirs.assets}${dirs.images}**/*.{jpg,jpeg,gif,svg,png}`
			],
			gulp.parallel("images")
		).on("unlink", function(path) {
			let filePathInBuildDir = path
				.replace(
					`${dirs.source}${dirs.assets}${dirs.images}`,
					`${taskTarget}${dirs.images}`
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
