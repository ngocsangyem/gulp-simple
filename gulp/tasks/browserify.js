// Thank you larsonjj

import gulp from "gulp";
import glob from "glob";
import browserify from "browserify";
import envify from "envify";
import babelify from "babelify";
import watchify from "watchify";
import _ from "lodash";
import vsource from "vinyl-source-stream";
import buffer from "vinyl-buffer";

import { plugins, args, config, taskTarget, browserSync } from "../utils";

const dirs = config.directories;
const entries = config.directories.entries;

let browserifyTask = (files, done) => {
	return files.map(entry => {
		// let dest = path.resolve(taskTarget);
		let dest = `${taskTarget}/${dirs.scripts}`;

		// Options
		let customOpts = {
			entries: [entry],
			debug: true,
			transform: [
				babelify.configure({
					presets: ["@babel/preset-env"]
				}), // Enable ES6 features
				envify // Sets NODE_ENV for better optimization of npm packages
			]
		};

		let bundler = browserify(customOpts);

		if (!args.production) {
			// Setup Watchify for faster builds
			let opts = Object.assign({}, watchify.args, customOpts);
			bundler = watchify(browserify(opts));
		}

		let rebundle = function() {
			let startTime = new Date().getTime();
			bundler
				.bundle()
				.on("error", function(err) {
					plugins.util.log(
						plugins.util.colors.red("Browserify compile error:"),
						"\n",
						err.stack,
						"\n"
					);
					this.emit("end");
				})
				.pipe(vsource(entry))
				.pipe(buffer())
				.pipe(
					plugins.if(
						!args.production,
						plugins.sourcemaps.init({ loadMaps: true })
					)
				)
				.pipe(plugins.if(args.production, plugins.terser()))
				.pipe(
					plugins.rename(function(filepath) {
						// Remove 'source' directory as well as prefixed folder underscores
						// Ex: 'src/_scripts' --> '/scripts'
						filepath.dirname = "";
					})
				)
				.pipe(
					plugins.if(!args.production, plugins.sourcemaps.write("./"))
				)
				.pipe(gulp.dest(dest))
				// Show which file was bundled and how long it took
				.on("end", function() {
					let time = (new Date().getTime() - startTime) / 1000;
					plugins.util.log(
						plugins.util.colors.cyan(entry) +
							" was browserified: " +
							plugins.util.colors.magenta(time + "s")
					);
					done();
					return browserSync.reload("*.+(js|ts)");
				});
		};

		if (!args.production) {
			bundler.on("update", rebundle); // on any dep update, runs the bundler
			bundler.on("log", plugins.util.log); // output build logs to terminal
		}
		return rebundle();
	});
};

// Browserify Task
gulp.task("browserify", done => {
	return glob(`./${dirs.source}${dirs.app}${entries.script}`, function(
		err,
		files
	) {
		if (err) {
			throw new Error(err);
		}

		return browserifyTask(files, done);
	});
});
