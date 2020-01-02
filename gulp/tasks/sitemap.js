import gulp from "gulp";
import path from "path";
import fs from "fs";
import { plugins, args, config, taskTarget, browserSync } from "../utils";

const dirs = config.directories;
const dest = path.join(taskTarget);
const SEO = JSON.parse(fs.readFileSync(`${dirs.source}${dirs.app}seo.json`));

gulp.task("sitemap", () => {
	return gulp
		.src(
			[
				path.join(taskTarget, "**/*.html"),
				"!" + path.join(taskTarget, "**/404.html"),
				"!" + path.join(taskTarget, "**/403.html"),
				"!" + path.join(taskTarget, "**/400.html"),
				"!" + path.join(taskTarget, "**/500.html"),
				"!" + path.join(taskTarget, "**/502.html"),
				"!" + path.join(taskTarget, "**/503.html")
			],
			{
				read: false
			}
		)
		.pipe(
			plugins.sitemap({
				siteUrl: "//" + SEO.cfg_url
			})
		)
		.pipe(gulp.dest(dest));
});
