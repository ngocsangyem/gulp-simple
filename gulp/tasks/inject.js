const gulp = require("gulp");
const path = require("path");

const {
	plugins,
	args,
	config,
	taskTarget,
	browserSync
} = require("../utils");

const pipe = require('../core/pipe');
const injectTo = require('../core/inject');

function inject() {
	return pipe(injectTo, this, 'Inject to HTML')
}

gulp.task("inject", () => {
	return gulp
		.src(`${taskTarget}/*.html`)
		.pipe(inject())
		.pipe(gulp.dest(`./${taskTarget}`));
});
