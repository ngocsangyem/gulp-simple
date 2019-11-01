import gulpLoadPlugins from 'gulp-load-plugins';
import browserSyncLib from 'browser-sync';
import minimist from 'minimist';
import cfg from '../config';

const defaultNotification = function(err) {
	return {
		subtitle: err.plugin,
		message: err.message,
		sound: 'Funk',
		onLast: true
	};
};

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
export const plugins = gulpLoadPlugins();

// Create karma server
export const KarmaServer = require('karma').Server;

// Get package.json custom configuration
export const config = Object.assign({}, cfg, defaultNotification);

// Gather arguments passed to gulp commands
export const args = minimist(process.argv.slice(2));

// Alias config directories
export const dirs = config.directories;

// Determine gulp task target destinations
export const taskTarget = args.production ? dirs.destination : dirs.temporary;

// Create a new browserSync instance
export const browserSync = browserSyncLib.create();
