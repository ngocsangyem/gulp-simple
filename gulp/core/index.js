const fs = require("fs");
const path = require("path");
const notify = require("gulp-notify");
const { isFile, isDirectory } = require("./is");
const { taskTarget, reportError } = require("../utils");

const root = path.resolve(__dirname, "..");
const root2 = path.resolve(__dirname, "../..");

const paths = {
	slashNormalize(str) {
		const isExtendedLengthPath = /^\\\\\?\\/.test(str);
		const hasNonAscii = /[^\u0000-\u0080]+/.test(str);

		if (isExtendedLengthPath || hasNonAscii) return str;

		return str.replace(/\\/g, "/");
	},

	root() {
		return path.join(this._root, ...arguments);
	},

	app() {
		return path.join(this._app, ...arguments);
	},

	component() {
		return path.join(this._component, ...arguments);
	},

	page() {
		return path.join(this._page, ...arguments);
	},

	style() {
		return path.join(this._style, ...arguments);
	},

	assets() {
		return path.join(this._assets, ...arguments);
	},

	dist() {
		return path.join(this._dist, ...arguments);
	},

	_root: root,
	_root2: root2,
	_app: path.join(root2, "src", "app"),
	_component: path.join(root2, "src", "app", "components"),
	_page: path.join(root2, "src", "app", "pages"),
	_style: path.join(root2, "src", "app", "styles"),
	_assets: path.join(root2, "src", "assets"),
	_dist: path.join(root2, taskTarget)
};

try {
	if (!fs.existsSync(paths._app)) {
		fs.mkdirSync(paths._app);
	}

	if (!fs.existsSync(paths._component)) {
		fs.mkdirSync(paths._component);
	}

	if (!fs.existsSync(paths._page)) {
		fs.mkdirSync(paths._page);
	}
} catch (error) {
	console.log("Add main dirs fail", error);
	// notify.onError("Error")(error);
	reportError;
}

// Read config

let config = {};

try {
	const appConfig = paths.root("config.js");

	if (fs.existsSync(appConfig)) {
		config = require(appConfig);
	}
} catch (error) {
	console.log("Find config file fail", error);
	// notify.onError("Error")(error);
	reportError;
} finally {
	// Merge extnames
	const component = {
		templates: ".pug",
		script: ".js",
		style: ".sass",
		test: true,
		data: true
	};

	config.component = Object.assign(component, config.component);

	if (config.component.templates[0] !== ".") {
		config.component.templates = "." + config.component.templates;
	}
	if (config.component.script[0] !== ".") {
		config.component.script = "." + config.component.script;
	}
	if (config.component.style[0] !== ".") {
		config.component.style = "." + config.component.style;
	}

	// Merge build
	const build = {
		autoprefixer: ["last 3 versions"],
		babel: true,
		sourcemaps: [],
		imagemin: [],
		addVersions: true,
		author: {
			name: "ngocsangyem",
			version: "v1.0.0",
			link: "https://github.com/ngocsangyem",
			lincense: "MIT",
			coding: "Coding by ngocsangyem",
			phone: "XXXXXXXXXX",
			email: "yem@email.com"
		}
	};

	config.build = Object.assign(build, config.build);

	if (!Array.isArray(config.build.sourcemaps)) {
		config.build.sourcemaps = [config.build.sourcemaps];
	}
	if (!Array.isArray(config.build.autoprefixer)) {
		config.build.autoprefixer = [config.build.autoprefixer];
	}

	config.build.imagemin = []
		.concat(config.build.imagemin)
		.filter(el => ["png", "jpg", "svg", "gif"].includes(el));

	if (config.build.imagemin.includes("jpg")) {
		config.build.imagemin.push("jpeg");
	}

	// Merge addContent

	const dependency = `// Dependency of [name]Component\n\nmodule.exports = {\n\n\tnodes: [],\n\n\tmodules: [],\n\n}\n`

	const addContent = {
		dependency,
		json: '{}',
		sass: ".[name]"
	};

	config.addContent = Object.assign(addContent, config.addContent);

	// Merge dist

	const directories = {
		base: "./",
		source: "src/",
		app: "app/",
		destination: "build/",
		temporary: "tmp/",
		component: "components/",
		style: "styles/",
		assets: "assets/",
		script: "scripts/",
		image: "img/",
		fonts: "fonts/",
		data: "data/",
		pages: "pages/",
		entries: {
			script: "main.js",
			css: "main.+(sass|scss)",
			data: "data.json"
		}
	};

	config.directories = Object.assign(directories, config.directories);

	// Merge optimization

	const optimization = {
		jpg: {
			progressive: true,
			arithmetic: false
		},
		png: {
			optimizationLevel: 5,
			bitDepthReduction: true,
			colorTypeReduction: true,
			paletteReduction: true
		},
		gif: {
			optimizationLevel: 1,
			interlaced: true
		},
		svg: [
			{ cleanupIDs: false },
			{ removeViewBox: false },
			{ mergePaths: false }
		]
	};

	if (!config.optimization) {
		config.optimization = {};
	}

	config.optimization = {
		jpg: Object.assign(optimization.jpg, config.optimization.jpg),
		png: Object.assign(optimization.png, config.optimization.png),
		gif: Object.assign(optimization.gif, config.optimization.gif),
		svg: [].concat(config.optimization.svg || optimization.svg),
		ignore: [].concat(config.optimization.ignore).filter(el => !!el)
	};

	// Protect

	config.componentProtect = [].concat(config.componentProtect);
}

module.exports = { paths, config };
