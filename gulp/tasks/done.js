const gulp = require("gulp");
const colors = require("colors");

const { plugins, args, cfg, taskTarget, browserSync } = require("../utils");

let banner = [
	" ",
	"/////////////////////////////////////",
	"// ngocsangyem",
	"/////////////////////////////////////",
	" "
].join("\n");

gulp.task("done", done => {
	return console.log(
		colors.rainbow("\nCongratulations!\n"),
		colors.green(banner),
		colors.magenta("\nBuild Finished! Press Ctrl+C to exit.")
	);
});
