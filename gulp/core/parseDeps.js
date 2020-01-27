const checkModules = require('./checkModules');
const checkNode = require('./checkNode');
const {
	paths,
	isDev
} = require('../utils')

/**
 * Parse component dependencies.
 *
 * @param {String} component
 * @param {Object} page
 * @param {Object} dependencies
 *
 * @return {undefined}
 */


const parseDeps = function (component, page, dependencies) {
	if (!dependencies[component]) {
		return;
	}

	const nodes = dependencies[component].nodes || [];

	nodes.forEach(node => {
		if (typeof node !== 'string') {
			return;
		}

		node = node.trim();
		checkNode(node, component, paths, isDev);

		if (page.components[node]) {
			return;
		}

		parseDeps(node, page, dependencies);
	});

	checkModules(component, 'inject', page, dependencies);
}

module.exports = {
	parseDeps
}
