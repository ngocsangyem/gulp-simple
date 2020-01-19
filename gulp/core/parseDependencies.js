const checkModules = require("./checkModules");
const checkNode = require("./checkNode");
const { paths, store, isDev } = require("../utils");

const parseDependencies = function(component, page, deps) {
	if (!deps[component]) {
		return;
	}

	const nodes = deps[component].nodes || [];

	nodes.forEach(node => {
		if (typeof node !== "string") {
			return;
		}

		node = node.trim();

		checkNode(node, component, paths, isDev);
		if (page.nodes[node]) {
			return;
		}
		parseDependencies(node, page, deps);
	});

	checkModules(component, "inject", page, deps);
};

module.exports = parseDependencies;
