const path = require("path");
const fs = require("fs");
const glob = require("glob");

const pugLex = require("pug-lexer");
const pugParser = require("pug-parser");
const pugWalk = require("pug-walk");
const pugDependency = require("pug-dependency");
const {
	config
} = require("./index");
const {
	parseDeps
} = require('./parseDeps');
const readComponent = require('./readComponent')

/**
 * Get component
 *
 * @param {File} file
 *
 * @return {Object} page
 */

module.exports = function (file, page) {
	const filePath = file.path;
	const content = fs.readFileSync(filePath, "utf8");

	function getFilePath(filePath, extension) {
		return `./src/app/${filePath
			.replace(/^(?:\.\.\/)+/, "")
			.replace(/\.[^/.]+$/, `${extension}`)}`;
	}

	pugWalk(pugParser(pugLex(content, {
		filename: filePath
	})), node => {
		let {
			type
		} = node;
		if (type === "Include") {
			const dirName = path.basename(path.dirname(node.file.path));

			const component = (page.components[dirName] = {
				name: dirName,
				template: getFilePath(
					node.file.path,
					config.component.templates
				),
				style: getFilePath(node.file.path, config.component.style),
				script: getFilePath(node.file.path, config.component.script)
			});

			const componentDirName = path.basename(path.dirname(component.style)) || path.basename(path.dirname(component.script)) || path.basename(path.dirname(component.template));

			parseDeps(componentDirName, page, page.dependencies);
			readComponent(page.dependencies)
		}
	});
};