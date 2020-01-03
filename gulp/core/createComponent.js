const fs = require("fs");
const path = require("path");

const { paths, config } = require("./index");
const { reportError } = require("../utils");
const { isDirectory, isFile } = require("./is");
const BEM = require("./bem");

const prefix = "Component";
const extensionPrefix = ".component";

module.exports = {
	sep: Array(16).join("-"),
	message: "",

	setType(argv) {
		this.type = argv[2] === "page" ? argv[2] : "node";
	},

	setItems(argv) {
		let items = argv.slice(this.type === "page" ? 3 : 2);

		this.items = items.filter((el, i) => items.indexOf(el) === i);
	},

	checkDirs() {
		try {
			const app = paths._app;
			const pages = paths._page;
			const component = paths._component;

			if (!fs.existsSync(app)) {
				fs.mkdirSync(app);
			}
			if (!fs.existsSync(pages)) {
				fs.mkdirSync(pages);
			}
			if (!fs.existsSync(component)) {
				fs.mkdirSync(component);
			}
		} catch (error) {
			console.log("Create main folder fail", error);
			// notify.onError("Error")(e);
			return reportError;
		}
	},

	addMessage(str) {
		if (typeof str !== "string") return;

		const newLine = this.message === "" ? "" : "\n";

		this.message += newLine + str;
	},

	addPage(name) {
		const extname = path.extname(name) || config.component.templates;
		const basename = path.basename(name, extname);
		const file = paths.pages(basename + extname);
		const content = (
			(config.addContent && config.addContent.page) ||
			""
		).replace(/\[name\]/g, basename);

		return this.addFile(file, content);
	},

	addNode(node, extensions) {
		const component = BEM.getBlock(node);
		const directory = paths.component(component);
		const testDirectory = paths.component(component + '/test');

		if (!fs.existsSync(directory)) {
			this.addDirectory(directory);
		}

		extensions = Array.isArray(extensions) ? extensions : [extensions];

		extensions.forEach(extension => {
			if (!extension || !extension.trim() || typeof extension !== "string") return;

			extension = extension.trim().toLowerCase();

			const isFile = extension[0] === "." || path.extname(extension);

			if (!isFile) {
				let prev = directory;

				return extension.split(path.sep).forEach(dir => {
					if (!dir || !dir.trim() || typeof dir !== "string") return;

					const where = path.join(prev, dir);

					this.addDirectory(where);

					prev = where;
				});
			}

			let extname = extension !== 'dependency.js' ? extension : path.extname(extension);
			let file;
			let name = extension !== 'dependency.js' ? path.basename(extension, extname) || node : node;
            console.log('TCL: addNode -> name', name)
			let content = (
				(config.addContent && config.addContent[extname.slice(1)]) ||
				""
			).replace(/\[name\]/g, name);

			if (extension !== '.test.js' && extension !== 'dependency.js') {
				file = path.join(directory, name + extensionPrefix + extname);
				return this.addFile(file, content);
			} else if (extension == '.test.js') {
				content = ( (config.addContent && config.addContent[extname.replace(extname, 'test')]) || "").replace(/\[name\]/g, name);
				file = path.join(testDirectory, name + extensionPrefix + extname);
				this.addDirectory(testDirectory);
				return this.addFile(file, content);
			} else if(extension == 'dependency.js') {
				content = ((config.addContent && config.addContent.dependency) || "").replace(/\[name\]/g, name);
				file = path.join(directory, extension);
				return this.addFile(file, content);
			}
		});
	},

	addDirectory(dir) {
		const where = path.relative(paths._component, dir).replace("..", "");

		if (fs.existsSync(dir)) {
			return this.addMessage(
				`\x1b[41mFAIL\x1b[0m: Directory "\x1b[36m${where}\x1b[0m" already exist!`
			);
		}

		fs.mkdirSync(dir);

		this.addMessage(
			`\x1b[42mGOOD\x1b[0m: Directory "\x1b[36m${where}\x1b[0m" successfully created!`
		);
	},

	addFile(file, content) {
		const where = path.relative(paths._component, file).replace("..", "");
		const what = this.type === "page" ? "Page" : "File";

		if (fs.existsSync(file)) {
			return this.addMessage(
				`\x1b[41mFAIL\x1b[0m: ${what} "\x1b[36m${where}\x1b[0m" already exist!`
			);
		}

		fs.writeFileSync(file, content, "utf8");

		this.addMessage(
			`\x1b[42mGOOD\x1b[0m: ${what} "\x1b[36m${where}\x1b[0m" successfully created!`
		);
	},

	parseArguments(argv, showMessage = true) {
		this.setType(argv);
		this.setItems(argv);
		this.checkDirs();

		if (this.items.length === 0) {
			this.status = false;
			this.message = `\x1b[41mFAIL\x1b[0m: You must write a \x1b[36m${this.type}\x1b[0m name!`;
		} else {
			try {
				if (this.items) {
					this.items.forEach(item => {
						let name = item.split("[")[0];
						let more = (item.split("[")[1] || "").replace("]", "");
						let extra = more.split(",");

						name = name.trim().toLowerCase();

						if (this.type === "page") {
							return this.addPage(`${name}Component`);
						}

						if (
							config.createComponent &&
							config.createComponent[more]
						) {
							extra = config.createComponent[more];
						}

						return this.addNode(name, extra);
					});
				}
			} catch (error) {
				console.log(error);
				return reportError;
			}
		}

		if (this.message && showMessage)
			console.log(
				`\x1b[1mTry add ${this.type}\x1b[0m:\n${this.sep}\n${this.message}\n${this.sep}\n`
			);
	}
};
