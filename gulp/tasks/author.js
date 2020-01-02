import gulp from "gulp";
import { plugins, args, config, taskTarget, browserSync } from "../utils";

const auth = config.build.author;
const dest = `${taskTarget}`;

let banner = [
	"/*",
	" ////////////////////////////////////////////////////////",
	" // <%= auth.name %>",
	" // @version v<%= auth.version %>",
	" // @link <%= auth.link %>",
	" // @license <%= auth.license %>",
	" // @<%= auth.coding %> - <%= auth.phone %>",
	" // @<%= auth.email %>",
	" ////////////////////////////////////////////////////////",
	"*/"
].join("\n");

gulp.task("author", () => {
	return gulp
		.src(`${taskTarget}/**/*.{css,js}`)
		.pipe(
			plugins.header(banner, {
				auth: auth
			})
		)
		.pipe(gulp.dest(dest));
});
