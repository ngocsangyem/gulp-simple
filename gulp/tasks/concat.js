import gulp from "gulp";
import fs from "fs";
import strip from "gulp-strip-comments";
import stripCssComments from "gulp-strip-css-comments";

import { plugins, args, config, taskTarget, browserSync } from "../utils";

const dirs = config.directories;
const url = JSON.parse(fs.readFileSync("./plugins.json"));
const destJs = `${taskTarget}/${dirs.scripts}`;
const destCss = `${taskTarget}/${dirs.css}`;

gulp.task("concatJs", () => {
	return gulp
		.src(url.scripts, { allowEmpty: true })
		.pipe(strip())
		.pipe(plugins.concat("core.js"))
		.pipe(plugins.terser())
		.pipe(gulp.dest(destJs));
});

gulp.task("concatCss", () => {
	return gulp
		.src(url.styles, { allowEmpty: true })
		.pipe(stripCssComments())
		.pipe(plugins.concat("core.css"))
		.pipe(plugins.cssnano())
		.pipe(gulp.dest(destCss));
});
