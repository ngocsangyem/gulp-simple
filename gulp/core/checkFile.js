const fs = require("fs");

/**
 * Check file from component dependency
 */

module.exports = (file, component, item, isDev) => {
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
