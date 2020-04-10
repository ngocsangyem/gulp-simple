const fs = require("fs");
const path = require("path");
const glob = require("glob");

const merge = require("webpack-merge");
const { config, taskTarget } = require("../gulp/utils");
const common = require("./webpack.config");

const dirs = config.directories.development;
const jsPath = `${dirs.source}${dirs.app}${dirs.component}**/*.js`;

const getEntry = function () {
	const files = {};
	glob.sync(jsPath)
		.filter(function (file) {
			return /\.component\.(js)$/i.test(file);
		})
		.map(function (file) {
			files[path.basename(path.dirname(file))] = `./${file}`;
		});
	return files;
};

const WebpackComponent = merge(common, {
	mode: "production",
	entry: getEntry(),
	output: {
		filename: "[name]/[name].js",
		path: path.resolve(__dirname, `../${taskTarget}/${dirs.component}`),
	},
});

module.exports = WebpackComponent;
