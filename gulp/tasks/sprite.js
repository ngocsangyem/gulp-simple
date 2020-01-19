const gulp = require("gulp");
const buffer = require("vinyl-buffer");
const merge = require("merge-stream");
const spritesmith = require("gulp.spritesmith");

const { plugins, args, config, taskTarget, browserSync } = require("../utils");

const dirs = config.directories;
const dirsPro = dirs.production;
const dirsDev = dirs.development;
const dest = `${taskTarget}/${dirsPro.image}/sprite`;

gulp.task("sprite", () => {
	let spriteData = gulp
		.src(`${dirsDev.source}${dirsDev.assets}${dirsDev.image}sprite/*.png`)
		.pipe(
			spritesmith({
				imgName: "sprite.png",
				cssName: "sprite.css"
			})
		);
	// Pipe image stream through image optimizer and onto disk
	let imgStream = spriteData.img
		// DEV: We must buffer our stream into a Buffer for `imagemin`
		.pipe(buffer())
		.pipe(plugins.imagemin())
		.pipe(gulp.dest(dest));
	let cssStream = spriteData.css
		.pipe(plugins.cssnano({ rebase: false }))
		.pipe(gulp.dest(`${taskTarget}/${dirs.css}`));
	// Return a merged stream to handle both `end` events
	return merge(imgStream, cssStream);
});
