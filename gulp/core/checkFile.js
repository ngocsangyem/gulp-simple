const fs = require("fs");
const {
	isDev
} = require("../utils");

/**
 * Check a file from component dependency.
 *
 * @param {File} file
 * @param {String} component
 * @param {String} item
 * @param {Boolean} isDev
 *
 * @return {Boolean}
 */

module.exports = function (file, component, item, isDev) {
	if (!fs.existsSync(file)) {
		const message = `\n\n\x1b[41mFAIL\x1b[0m: Component "\x1b[36m${component}\x1b[0m" has dependency "\x1b[36m${item}\x1b[0m", but this file not found, please install module or remove it from "\x1b[36m${component}/deps.js\x1b[0m"!\n\nNot found: ${file}.\n\n`;

		if (!isDev) {
			throw new Error(message);
		}

		console.log(message);

		return false;
	}

	return true;
};
