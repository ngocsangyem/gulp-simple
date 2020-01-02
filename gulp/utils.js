import browserSyncLib from "browser-sync";
import minimist from "minimist";

import gutil from "gulp-util";
import gulpLoadPlugins from "gulp-load-plugins";
import notify from "gulp-notify";

import AppConfig from "./config";

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
export const plugins = gulpLoadPlugins();

// Create karma server
export const KarmaServer = require("karma").Server;

// Get config.js custom configuration
export const config = Object.assign({}, AppConfig);

// Gather arguments passed to gulp commands
export const args = minimist(process.argv.slice(2));

// Alias config directories
export const dirs = config.directories;

// Determine gulp task target destinations
export const taskTarget = args.production ? dirs.destination : dirs.temporary;

// Create a new browserSync instance
export const browserSync = browserSyncLib.create();

export const reportError = function(error) {
	// [log]
	//console.log(error);

	// Format and ouput the whole error object
	//console.log(error.toString());

	// ----------------------------------------------
	// Pretty error reporting

	var report = "\n";
	var chalk = gutil.colors.white.bgRed;

	if (error.plugin) {
		report += chalk("PLUGIN:") + " [" + error.plugin + "]\n";
	}

	if (error.message) {
		report += chalk("ERROR: ") + " " + error.message + "\n";
	}

	console.error(report);

	// ----------------------------------------------
	// Notification

	if (error.line && error.column) {
		var notifyMessage = "LINE " + error.line + ":" + error.column + " -- ";
	} else {
		var notifyMessage = "";
	}

	notify({
		title: "FAIL: " + error.plugin,
		message: `${notifyMessage}${error.message}`,
		sound: "Frog" // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
	}).write(error);

	gutil.beep(); // System beep (backup)

	// ----------------------------------------------
	// Prevent the 'watch' task from stopping

	this.emit("end");
};
