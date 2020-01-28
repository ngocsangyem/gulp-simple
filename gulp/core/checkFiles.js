const path = require('path');
const fs = require('fs');

const BEM = require('./bem');
const checkModules = require('./checkModules');
const {
	store,
	paths,
	config,
	isDev
} = require('../utils')

/**
 * Check a files
 *
 * @param {String} type
 *
 * @return {undefined}
 */

module.exports = function (type) {
	const bundleName = config.build.bundleName;
}
