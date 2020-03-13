const fs = require("fs");
const path = require("path");
const notify = require("gulp-notify");

const { isFile } = require("./is");
const root = path.resolve(__dirname, "..");
const root2 = path.resolve(__dirname, "../..");
const environment = process.env.NODE_ENV || "development";
const target = environment === "production" ? "build" : "tmp";

// Read config

let config = {};

try {
	const appConfig = "./gulp/config.js";

	if (isFile(appConfig)) {
		config = require("../config.js");
	}
} catch (error) {
	console.log("Find config file fail", error);
	notify.onError("Error")(error);
} finally {
	// Merge extnames
	const component = {
		templates: ".pug",
		script: ".js",
		style: ".sass",
		test: true,
		data: true,
		javascriptSyntax: "class",
		page: {
			type: "component"
		}
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
		HTMLRoot: "./",
		autoprefixer: ["last 3 versions"],
		babel: true,
		sourcemaps: [],
		imagemin: [],
		addVersions: true,
		bundleName: "app",
		bundles: [],
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

	const dependencyTemplate = `// Dependency of [capitalize-name]Component\n\nmodule.exports = {\n\n\tnodes: [],\n\n\tmodules: [],\n\n}\n`;

	const jsonTemplate = "{}";

	const sassTemplate = ".[name]";

	const componentTemplate = `mixin [name](data)\n\t- data = data || {}\n\t- data.class = data.class || ''\n\t- data.content = data.content || 'Some content here'\n\n\t.content(class=data.class)&attributes(attributes)\n\t\tif block\n\t\t\tblock\n\t\telse\n\t\t\t!= data.content`;

	const testTemplate = `import { [capitalize-name]Component } from '../[name].component';\n\ndescribe('[capitalize-name]Component View', function() {\n\n\tbeforeEach(() => {\n\t\tthis.[capitalize-name] = new [capitalize-name]Component();\n\t});\n\n\tit('Should run a few assertions', () => {\n\t\texpect(this.[capitalize-name]).to.exist;\n\t});\n\n});`;

	const jsTemplateClass = `export class [capitalize-name]Component {\n\tconstructor() {\n\t\tconsole.log('[name] component');\n\t}\n}`;

	const jsTemplateFunction = `const [capitalize-name] = () => {\n\t console.log('This is [capitalize-name]');\n};\n\nexport { [capitalize-name] }`;

	const pageTemplate = `extends ../layouts/_layout\n\nblock var\n\t- title = '[upper-first-name]'\n\t- bodyClass = '[name]'\n\nblock main`;

	const addContent = {
		dependency: dependencyTemplate,
		json: jsonTemplate,
		sass: sassTemplate,
		pug: componentTemplate,
		test: testTemplate,
		js:
			component.javascriptSyntax === "class"
				? jsTemplateClass
				: jsTemplateFunction,
		page: pageTemplate
	};

	config.addContent = Object.assign(addContent, config.addContent);

	// // Merge createComponent

	// const createComponent = {};
	// config.createComponent = Object.assign(
	// 	createComponent,
	// 	config.createComponentt
	// );

	// Merge dist

	const directories = {
		base: "./",
		entries: {
			script: "main.js",
			css: "main.+(sass|scss)",
			data: "data.json"
		},
		development: {
			source: "src/",
			app: "app/",
			temporary: "tmp/",
			component: "components/",
			style: "styles/",
			assets: "assets/",
			script: "scripts/",
			image: "img/",
			fonts: "fonts/",
			data: "data/",
			pages: "pages/"
		},
		production: {
			destination: "build/",
			style: "styles/",
			script: "scripts/",
			fonts: "fonts/",
			image: "img/",
			assets: "assets/"
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
			{
				cleanupIDs: false
			},
			{
				removeViewBox: false
			},
			{
				mergePaths: false
			}
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

	// console.log("--config--", config);
}

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

	assets() {
		return path.join(this._assets, ...arguments);
	},

	dist() {
		return path.join(this._dist, ...arguments);
	},

	styles() {
		return path.join(this._styles, ...arguments);
	},

	scripts() {
		return path.join(this.scripts, ...arguments);
	},

	_root: root,
	_root2: root2,
	_app: path.join(root2, "src", "app"),
	_component: path.join(root2, "src", "app", "components"),
	_page: path.join(root2, "src", "app", "pages"),
	_assets: path.join(root2, "src", "assets"),
	_dist: path.join(root2, target),
	_styles: path.join(root2, target, config.directories.production.style),
	_scripts: path.join(root2, target, config.directories.production.script)
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
	notify.onError("Error")(error);
}

module.exports = {
	paths,
	config,
	environment
};
