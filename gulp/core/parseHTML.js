const path = require("path");

const { store } = require("../utils");

const { RemoveExtension } = require("../helpers/remove-extension");

const getNodes = require("./getNodes");

module.exports = function(file, directory) {
	const fileName = path.basename(file.path);
	const pageName = RemoveExtension(fileName);

	if (!store.pages[pageName]) {
		const page = (store.pages[pageName] = {
			name: pageName,
			components: {},
			styles: [],
			scripts: []
		});
		getNodes(file, page);
		console.log("store", store);
	}
};
