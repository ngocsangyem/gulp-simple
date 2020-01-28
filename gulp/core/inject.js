const path = require('path');
const injectToTemplate = require('./injectTemplate');
const {
	store
} = require('../utils')


/**
 * Inject some data to HTML.
 *
 * @param {Object} file
 *
 * @return {undefined}
 */

module.exports = function (file) {

	const code = String(file.contents);
	const name = path.basename(file.path, path.extname(file.path));
	const page = store.pages[name];
	const injected = injectToTemplate(code, page);

	file.contents = Buffer.from(injected);

}
