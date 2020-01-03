const browserSyncLib = require("browser-sync");
const minimist = require("minimist");

const gutil = require("gulp-util");
const gulpLoadPlugins = require("gulp-load-plugins");
const notify = require("gulp-notify");

const appConfig = require("./config");

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins();

// Create karma server
const KarmaServer = require("karma").Server;

// Get config.js custom configuration
const config = Object.assign({}, appConfig);

// Gather arguments passed to gulp commands
const args = minimist(process.argv.slice(2));

// Alias config directories
const dirs = config.directories;

// Determine gulp task target destinations
const taskTarget = args.production ? dirs.destination : dirs.temporary;

// Create a new browserSync instance
const browserSync = browserSyncLib.create();

const reportError = function(error) {
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

module.exports = {
	plugins,
	KarmaServer,
	config,
	args,
	taskTarget,
	browserSync,
	reportError
};
