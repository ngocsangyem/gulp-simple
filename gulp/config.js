export default {
	port: 9000,
	baseUrl: "./",

	component: {
		templates: ".pug",
		script: ".js",
		style: ".sass",
		test: true,
		data: true
	},

	build: {
		autoprefixer: ["last 3 versions", "ie 10", "ie 11"],
		babel: true,
		imagemin: ["png", "jpg", "svg", "gif"],
		sourcemaps: ["js", "css"],
		author: {
			name: "ngocsangyem",
			version: "v1.0.0",
			link: "",
			lincense: "MIT",
			coding: "Coding by yem",
			phone: "XXXXXXXXXX",
			email: "yem@email.com"
		}
	},

	directories: {
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
	},

	createComponent: {},

	addContent: {},

	optimization: {
		jpg: {
			progressive: true,
			arithmetic: false
		},

		png: {
			optimizationLevel: 5, // 0-7
			bitDepthReduction: true,
			colorTypeReduction: true,
			paletteReduction: true
		},

		gif: {
			optimizationLevel: 1, // 1-3
			interlaced: true
		},

		svg: [
			{ cleanupIDs: false },
			{ removeViewBox: false },
			{ mergePaths: false }
		],

		ignore: []
	}
};
