const path = require("path");

const {
	store
} = require("../utils");

const {
	removeExtension
} = require("../helpers/remove-extension");

const getComponent = require("./getComponent");

module.exports = function (file) {
	const fileName = path.basename(file.path);
	const pageName = removeExtension(fileName);

	if (!store.pages[pageName]) {
		const page = (store.pages[pageName] = {
			name: pageName,
			dependencies: {},
			components: {},
			styles: [],
			scripts: []
		});
		getComponent(file, page);

	}
};
