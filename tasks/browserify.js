// Thank you larsonjj

import glob from 'glob';
import browserify from 'browserify';
import envify from 'envify';
import babelify from 'babelify';
import watchify from 'watchify';
import _ from 'lodash';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const entries = config.entries;

	const browserifyTask = files => {
		return files.map(entry => {
			// let dest = path.resolve(taskTarget);
			let dest = `${taskTarget}`;

			// Options
			let customOpts = {
				entries: [entry],
				debug: true,
				transform: [
					babelify.configure({
						presets: ['@babel/preset-env']
					}), // Enable ES6 features
					envify // Sets NODE_ENV for better optimization of npm packages
				]
			};

			let bundler = browserify(customOpts);

			if (!args.production) {
				// Setup Watchify for faster builds
				let opts = _.assign({}, watchify.args, customOpts);
				bundler = watchify(browserify(opts));
			}

			let rebundle = function() {
				let startTime = new Date().getTime();
				bundler
					.bundle()
					.on('error', function(err) {
						$.util.log(
							$.util.colors.red('Browserify compile error:'),
							'\n',
							err.stack,
							'\n'
						);
						this.emit('end');
					})
					.on('error', $.notify.onError(config.defaultNotification))
					.pipe(source(entry))
					.pipe(buffer())
					.pipe(
						$.if(
							!args.production,
							$.sourcemaps.init({ loadMaps: true })
						)
					)
					.pipe($.if(args.production, $.terser()))
					.on('error', $.notify.onError(config.defaultNotification))
					.pipe(
						$.rename(function(filepath) {
							// Remove 'source' directory as well as prefixed folder underscores
							// Ex: 'src/_scripts' --> '/scripts'
							filepath.dirname = filepath.dirname
								.replace(dirs.source, '')
								.replace(dirs.app, '')
								.replace('_', '');
						})
					)
					.pipe($.if(!args.production, $.sourcemaps.write('./')))
					.pipe(gulp.dest(dest))
					// Show which file was bundled and how long it took
					.on('end', function() {
						let time = (new Date().getTime() - startTime) / 1000;
						console.log(
							$.util.colors.cyan(entry) +
								' was browserified: ' +
								$.util.colors.magenta(time + 's')
						);
						return browserSync.reload('*.js');
					});
			};

			if (!args.production) {
				bundler.on('update', rebundle); // on any dep update, runs the bundler
				bundler.on('log', $.util.log); // output build logs to terminal
			}
			return rebundle();
		});
	};

	// Browserify Task
	gulp.task('browserify', done => {
		return glob(
			`./${dirs.source}${dirs.app}${dirs.scripts}${entries.js}`,
			function(err, files) {
				if (err) {
					done(err);
				}

				return browserifyTask(files);
			}
		);
	});
}
