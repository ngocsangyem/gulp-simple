/* eslint-disable */
'use strict';
// Component file generator

const fs = require('fs');
const path = require('path');
const colors = require('colors');
const config = require('./config');
const mkdirp = require('mkdirp');
const Capitalize = require('./tasks/utils/capitalize');
function uniqueArray(arr) {
	const objectTemp = {};
	for (let i = 0; i < arr.length; i++) {
		const str = arr[i];
		objectTemp[str] = true;
	}
	return Object.keys(objectTemp);
}

function fileExist(path) {
	const fs = require('fs');
	try {
		fs.statSync(path);
	} catch (err) {
		return !(err && err.code === 'ENOENT');
	}
}
const dirs = config.directories;
const componentName = process.argv[2];
const defaultExtensions = ['sass', 'pug', 'js', 'test.js']; // default extensions
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// If there is a component name
if (componentName) {
	const dirPath = `${dirs.source}/${dirs.app}/${
		dirs.component
	}/${componentName}/`; // full path to the created component folder

	if (fs.existsSync(dirPath)) {
		console.log(colors.yellow(`This component has existed`));
		process.exit();
	}

	mkdirp(dirPath, err => {
		if (err) {
			console.log(colors.red(`Cancel operation: ${err}`));
		} else {
			console.log('Component created: ' + colors.green(dirPath));

			// We go around the array of extensions and create files if they have not yet been created.
			extensions.forEach(extension => {
				const filePath = `${dirPath}index.${extension}`; // full path to the file being created
				let fileContent = ''; // file content
				let fileCreateMsg = ''; // message in console when creating file
				let dirName = Capitalize(path.basename(path.dirname(filePath)));
				let fileName = Capitalize(path.basename(filePath));
				if (extension === 'sass') {
					fileContent = `// Colors of this file should follow the rule of colors in styles folder`;
				} else if (extension === 'scss') {
					fileContent = `// Colors of this file should follow the rule of colors in styles folder`;
				} else if (extension === 'js') {
					fileContent = `/* ES6 module */\n\nexport default class ${dirName +
						fileName} {
	constructor() { 
		console.log('${dirName + fileName} component');
	}
};`;
				} else if (extension === 'pug') {
					fileContent = '';
				} else if (extension === 'test.js') {
					fileContent = `import ${(dirName + fileName).replace(
						/\.[^.]*$/,
						''
					)} from './index';
describe('${dirName} View', function() {
	beforeEach(() => {
		this.${path
			.basename(path.dirname(filePath))
			.replace(/[-_]/g, '')} = new ${dirName + fileName}();
	});

	it('Should run a few assertions', () => {
		expect(this.${path
			.basename(path.dirname(filePath))
			.replace(/[-_]/g, '')}).to.exist;
	});
});`;
				}

				if (fileExist(filePath) === false) {
					fs.writeFile(filePath, fileContent, err => {
						if (err) {
							return console.log(
								colors.red(`File is NOT created: ${err}`)
							);
						}
						console.log('File created: ' + colors.green(filePath));
						if (fileCreateMsg) {
							console.warn(fileCreateMsg);
						}
					});
				}
			});
		}
	});
} else {
	console.log(colors.red('Cancel operation: no block specified'));
}
