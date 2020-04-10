const merge = require("webpack-merge");

const common = require("./webpack.config");
const { args } = require("../gulp/utils");

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
const WebpackConfig = merge(common, {
	mode: !args.production ? "development" : "production",
	output: {
		filename: "[name].js",
	},
});

module.exports = WebpackConfig;
