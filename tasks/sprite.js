import buffer from 'vinyl-buffer';
import path from 'path';
import merge from 'merge-stream';
import spritesmith from 'gulp.spritesmith';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const dest = `${taskTarget}/${dirs.images}/sprite`;

	gulp.task('sprite', () => {
		let spriteData = gulp
			.src(`${dirs.source}${dirs.assets}${dirs.images}sprite/*.png`)
			.pipe(
				spritesmith({
					imgName: 'sprite.png',
					cssName: 'sprite.css'
				})
			);
		// Pipe image stream through image optimizer and onto disk
		let imgStream = spriteData.img
			// DEV: We must buffer our stream into a Buffer for `imagemin`
			.pipe(buffer())
			.pipe($.imagemin())
			.pipe(gulp.dest(dest));
		let cssStream = spriteData.css
			.pipe($.cssnano({ rebase: false }))
			.pipe(gulp.dest(`${taskTarget}/${dirs.css}`));
		// Return a merged stream to handle both `end` events
		return merge(imgStream, cssStream);
	});
}
