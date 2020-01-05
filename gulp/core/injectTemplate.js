const path = require("path");
const fs = require("fs");
const { isExternal } = require("./is");
const { paths, config } = require("./index");
const { args } = require("../utils");

/**
 * Apply styles and script to template
 */

module.exports = function(code, page, task) {
	const { store } = task;

	const withGap = /(\s+)?(<!--(\s+)?GAP:([\w]+)(\s+)?-->)/gi;
	const comment = /(\s+)?(<!--(\s+)?BEMGO:([\w]+)(\s+)?-->)/gi;
	const pattern = /@(async|defer)/gi;
	const newLine = /(?:\r\n|\r|\n)/g;
	const version =
		args.production && config.build.addVersions ? `?v=${Date.now()}` : "";
	const arrays = {
		scripts: [],
		styles: []
	};

	if (!args.production) {
		page.styles.unshift(`${config.build.bundleName}.css`);
		page.scripts.push(`${config.build.bundleName}.js`);
	} else {
		const bundles = config.build.bundles;
		const style =
			(bundles.includes("css") ? page.name : config.build.bundleName) +
			".min.css";
		const script =
			(bundles.includes("js") ? page.name : config.build.bundleName) +
			".min.js";
		if (!fs.existsSync(paths.styles(style))) {
			page.styles.unshift(style);
		}
		if (!fs.existsSync(paths.scripts(script))) {
			page.scripts.push(script);
		}
	}

	page.scripts.forEach(src => {
		let script = '<script src="[src]"[attr]></script>';
		let attrs = "";

		if (/@async/gi.test(src)) {
			attrs += " async";
		}
		if (/@defer/gi.test(src)) {
			attrs += " defer";
		}

		if (!isExternal(src)) {
			src = `${config.build.HTMLRoot}${config.dist.scripts}/${src}`;
		}

		script = script
			.replace(
				"[src]",
				src.replace(pattern, "") + (isExternal(src) ? "" : version)
			)
			.replace("[attr]", attrs);

		if (arrays.scripts.indexOf(script) === -1) {
			arrays.scripts.push(script);
		}
	});

	page.styles.forEach(href => {
		let style = '<link rel="stylesheet" href="[href]">';

		if (!isExternal(href)) {
			href = `${config.build.HTMLRoot}${config.directories.production.style}/${href}`;
		}

		style = style.replace(
			"[href]",
			href.replace(pattern, "") + (isExternal(href) ? "" : version)
		);

		if (arrays.styles.indexOf(style) === -1) {
			arrays.styles.push(style);
		}
	});

	// Inject

	let injected = code;

	injected = injected.replace(comment, (str, indent, com, space, name) => {
		if (!indent) {
			indent = "";
		}

		indent = "\n" + indent.replace(newLine, "");
		name = name.trim().toLowerCase();

		let instead = "";

		if (arrays[name] && arrays[name].length > 0) {
			instead = indent + arrays[name].join(indent);
		}

		return instead;
	});

	// Add gap

	injected = injected.replace(withGap, (str, indent, com, space, name) => {
		if (!indent) {
			indent = "";
		}

		indent = "\n\n\n" + indent.replace(newLine, "");

		return indent + `<!-- ${name.trim()} -->`;
	});

	// Replace paths

	injected = injected.replace(
		/(,|'|"|`| )@([\w-]+)/gi,
		(str, quote, block) => {
			const paths = {
				style: config.directories.production.style,
				script: config.directories.production.script
			};

			const dist = paths[block] || `${paths.static}/${block}`;

			return `${quote}${config.build.HTMLRoot}${dist}`;
		}
	);

	return injected;
};
