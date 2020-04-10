const { args } = require("../gulp/utils");
const TerserPlugin = require("terser-webpack-plugin");

const WebpackCommon = {
	devtool: !args.production ? "source-map" : false,
	optimization: {
		splitChunks: {
			// include all types of chunks
			chunks: "all",
		},
		minimize: !args.production ? false : true,
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
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
};

if (args.production) {
	WebpackConfig.plugins.push(
		new TerserPlugin({
			cache: true,
			parallel: true,
			extractComments: "all",
		})
	);
}

module.exports = WebpackCommon;
