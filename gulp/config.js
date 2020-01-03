module.exports = {
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
		sourcemaps: ["js", "css"],
		imagemin: ["png", "jpg", "svg", "gif"],
		author: {
			name: "",
			version: "",
			link: "",
			lincense: "MIT",
			coding: "",
			phone: "",
			email: ""
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

	createComponent: {
		b: [".js", ".sass", ".pug", ".json", ".test.js", 'dependency.js']
	},

	addContent: {}
};
