const gulp = require("gulp");
const path = require("path");
const fs = require("fs");
const { plugins, args, cfg, taskTarget, browserSync } = require("../utils");

const dirs = cfg.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;
const dest = path.join(taskTarget);
const SEO = JSON.parse(
	fs.readFileSync(`${dirsDev.source}${dirsDev.app}seo.json`)
);

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
