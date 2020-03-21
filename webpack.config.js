const fs = require("fs");
const path = require("path");
const glob = require("glob");

const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const { args, config, taskTarget } = require("./gulp/utils");

const dirs = config.directories.development;
const jsPath = `${dirs.source}${dirs.app}${dirs.pages}**/*.js`;

// function getEntry() {
// 	const files = {};
// 	glob.sync(jsPath)
// 		.filter(function(file) {
// 			return /\.component\.(js)$/i.test(file);
// 		})
// 		.map(function(file) {
// 			files[path.basename(path.dirname(file))] = `./${file}`;
// 		});
// 	return files;
// }

// function generateHtmlPlugins(templateDir) {
// 	const templateFiles = `${templateDir}/*.html`;
// 	console.log("get it");

// 	return glob.sync(templateFiles).map(function(file) {
// 		const extension = path.extname(file);
// 		const name = path.basename(file, extension);
// 		return new HTMLWebpackPlugin({
// 			filename: `../${name}.html`,
// 			template: path.resolve(
// 				__dirname,
// 				`${templateDir}/${name}${extension}`
// 			),
// 			chunks: [name],
// 			inject: true
// 		});
// 	});
// }

const WebpackConfig = {
	mode: !args.production ? "development" : "production",
	devtool: !args.production ? "source-map" : false,
	// entry: getEntry(),
	output: {
		filename: "[name].js",
		path: path.resolve(
			__dirname,
			`${taskTarget}/${config.directories.production.script}`
		)
	},
	optimization: {
		splitChunks: {
			// include all types of chunks
			chunks: "all"
		},
		minimize: !args.production ? false : true
	},
	plugins: [],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}
		]
	}
};

if (args.production) {
	WebpackConfig.plugins.push(
		new TerserPlugin({
			cache: true,
			parallel: true,
			extractComments: "all"
		})
	);
}

module.exports = WebpackConfig;
