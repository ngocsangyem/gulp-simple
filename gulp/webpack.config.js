const { args, config } = require("./utils");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const dirs = config.directories;
const entries = config.entries;

const WebpackConfig = {
	mode: !args.production ? "development" : "production",
	devtool: !args.production ? "source-map" : false,
	output: {
		filename: "[name].js"
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
