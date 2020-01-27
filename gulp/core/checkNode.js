const fs = require('fs');
const BEM = require('./bem');

/**
 * Check a node from component dependency.
 *
 * @param {String} node
 * @param {String} component
 * @param {Object} paths
 * @param {Boolean} isDev
 *
 * @return {undefined}
 */


module.exports = function (node, from, paths, isDev) {
	const isComponent = BEM.isComponent(node);
	const component = isComponent ? node : BEM.getComponent(node);

	let exist = false;

	if (fs.existsSync(paths.component(component))) {
		exist = true;
	}

	if (exist) {
		return;
	}

	const message = `\n\n\x1b[41mFAIL\x1b[0m: Component "\x1b[36m${from}\x1b[0m" has dependency "\x1b[36m${node}\x1b[0m", but component "\x1b[36m${component}\x1b[0m" not found, please create component or remove it from "\x1b[36m${from}/deps.js\x1b[0m"!\n\n`;

	if (!isDev) {
		throw new Error(message);
	}

	console.log(message);
}
