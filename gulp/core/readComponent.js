const fs = require('fs');
const path = require('path');

const {
	isExternal,
	isDirectory,
	isFile
} = require('./is');
const {
	paths,
	store,
	config
} = require('../utils')


/**
 * Check all components and read deps.
 *
 * @return {undefined}
 */

module.exports = function (deps) {
	const component = paths._component;
	const root = paths._root;
	try {
		fs.readdirSync(component).forEach(com => {
			if (!isDirectory(paths.component(com))) {
				return;
			}
			const use = paths.component(com, 'deps.js');

			// Read deps
			if (fs.existsSync(use)) {
				delete require.cache[require.resolve(use)];
				const data = require(use);

				if (data && Array.isArray(data.modules)) {
					data.modules.forEach(module => {
						if (!module || module.constructor !== Object) {
							return;
						}

						if (!module.from || typeof module.from !== 'string') {
							return (module.from = path.join(component, com, 'assets'));
						}

						if (isExternal(module.from)) {
							return;
						}

						return (module.from = path.join('./', module.from));
					})
				}

				if (!deps[com]) {

					if (data) {
						deps[com] = {
							component: com,
							nodes: Array.isArray(data.nodes) ? data.nodes : [],
							modules: Array.isArray(data.modules) ? data.modules : []
						};
					}

				} else {

					if (data) {
						deps[com] = {
							component: com,
							nodes: Array.isArray(data.nodes) ? deps[com].nodes.concat(data.nodes) : deps[com].nodes,
							modules: Array.isArray(data.modules) ? deps[com].modules.concat(data.modules) : deps[com].modules
						};
					}

				}
			}
		});
	} catch (error) {
		console.log(error);
	}
}
