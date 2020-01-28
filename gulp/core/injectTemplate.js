const fs = require('fs');
const path = require('path');
const {
	isExternal
} = require('./is');

const {
	paths,
	config,
	store,
	isDev,
	taskTarget
} = require('../utils')

/**
 * Append styles and scripts  to HTML code.
 *
 * @param {String} code
 * @param {Object} page
 *
 * @return {String}
 */

module.exports = function (code, page) {
	const bundleName = config.build.bundleName;
	const withGap = /(\s+)?(<!--(\s+)?GAP:([\w]+)(\s+)?-->)/gi;
	const comment = /(\s+)?(<!--(\s+)?Inject:([\w]+)(\s+)?-->)/gi;
	const pattern = /@(async|defer)/gi;
	const newLine = /(?:\r\n|\r|\n)/g;
	const version = !isDev && config.build.addVersions ? `?v=${Date.now()}` : '';
	const arrays = {
		scripts: [],
		styles: [],
	};

	if (isDev) {
		page.styles.unshift(`${bundleName}.css`);
		page.scripts.push(`${bundleName}.js`);
	} else {
		const bundles = config.build.bundles;
		const style = (bundles.includes('css') ? page.name : bundleName) + '.min.css';
		const script = (bundles.includes('js') ? page.name : bundleName) + '.min.js';

		if (fs.existsSync(path.join(paths._styles, style))) {
			page.styles.unshift(style);
		}
		if (fs.existsSync(path.join(paths._scripts, script))) {
			page.scripts.push(script);
		}
	}

	// Prepare scripts
	if (!!page) {
		page.scripts.forEach(src => {

			let script = '<script src="[src]"[attr]></script>';
			let attrs = '';

			if (/@async/gi.test(src)) attrs += ' async';
			if (/@defer/gi.test(src)) attrs += ' defer';

			if (!isExternal(src)) {
				src = isDev ? `${config.build.HTMLRoot}${config.directories.development.script}${src}` : `${config.build.HTMLRoot}${config.directories.production.script}${src}`;
			}

			script = script.replace('[src]', src.replace(pattern, '') + (isExternal(src) ? '' : version)).replace('[attr]', attrs);

			if (arrays.scripts.indexOf(script) === -1) {
				arrays.scripts.push(script);
			}
		});

		// Prepare styles

		page.styles.forEach(href => {

			let style = '<link rel="stylesheet" href="[href]">';

			if (!isExternal(href)) {
				href = isDev ? `${config.build.HTMLRoot}${config.directories.development.style}${href}` : `${config.build.HTMLRoot}${config.directories.production.style}${href}`;
			}

			style = style.replace('[href]', href.replace(pattern, '') + (isExternal(href) ? '' : version))

			if (arrays.styles.indexOf(style) === -1) {
				arrays.styles.push(style);
			}
		});
	}


	// Inject

	let injected = code;

	injected = injected.replace(comment, (str, indent, com, space, name) => {

		if (!indent) {
			indent = '';
		}

		indent = '\n' + indent.replace(newLine, '');
		name = name.trim().toLowerCase();

		let instead = '';

		if (arrays[name] && arrays[name].length > 0) {
			instead = indent + arrays[name].join(indent);
		}

		return instead;

	});

	// Add gap

	injected = injected.replace(withGap, (str, indent, com, space, name) => {

		if (!indent) {
			indent = '';
		}

		indent = '\n\n\n' + indent.replace(newLine, '');

		return indent + `<!-- ${name.trim()} -->`;

	});

	// Replace paths

	injected = injected.replace(/(,|'|"|`| )@([\w-]+)/gi, (str, quote, component) => {

		const paths = {
			styles: isDev ? config.directories.development.style : config.directories.production.style,
			scripts: isDev ? config.directories.development.script : config.directories.production.script,
			assets: isDev ? config.directories.development.assets : config.directories.production.assets,
		};

		const dist = paths[component] || `${paths.assets}/${component}`;

		return `${quote}${config.build.HTMLRoot}${dist}`;
	});


	return injected;
}
