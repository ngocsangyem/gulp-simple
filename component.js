/* eslint-disable */
'use strict';
// Component file generator

const fs = require('fs');
const path = require('path');
const colors = require('colors');
const config = require('./config');
const mkdirp = require('mkdirp');
const Capitalize = require('./gulp/helpers/capitalize');
const RemoveExtension = require('./gulp/helpers/remove-extension');
const RemoveDash = require('./gulp/helpers/remove-dash');

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
let componentName = process.argv[2];
const defaultExtensions = ['sass', 'pug', 'js', 'test.js', 'json']; // default extensions
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

function handleComponentName() {
	if (typeof componentName !== 'string') return '';

	if (componentName.includes('/')) {
		const newComponentName = componentName.split('/');
		return (componentName = newComponentName[newComponentName.length - 1]);
	} else {
		return componentName;
	}
}

// If there is a component name
if (componentName) {
	const dirPath = `${dirs.source}/${dirs.app}/${dirs.component}/${componentName}/`; // full path to the created component folder

	if (fs.existsSync(dirPath)) {
		console.log(colors.yellow(`This component has existed`));
		process.exit();
	}

	mkdirp(dirPath, err => {
		if (err) {
			console.log(colors.red(`Cancel operation: ${err}`));
		} else {
			console.log('Created: ' + colors.green(dirPath));

			// We go around the array of extensions and create files if they have not yet been created.
			extensions.forEach(extension => {
				const filePath = `${dirPath +
					componentName}.component.${extension}`; // full path to the file being created
				// console.log('TCL: dirPath', dirPath);
				// console.log('TCL: componentName', componentName);
				let fileContent = ''; // file content
				let fileCreateMsg = ''; // message in console when creating file
				let dirName = Capitalize(path.basename(path.dirname(filePath)));
				let fileName = Capitalize(path.basename(filePath));
				const sassTemplate = `// Colors of this file should follow the rule of colors in styles folder`;
				const scssTemplate = `// Colors of this file should follow the rule of colors in styles folder`;
				const jsTemplate = `/* ES6 module */\n\nconst ${dirName}Component = () => {
	console.log('This is ${dirName}Component')
}

export {${dirName}Component};`;
				const pugTemplate = '';
				const testTemplate = `import ${dirName}Component from './${path.basename(
					path.dirname(filePath)
				)}.component';
describe('${dirName}Component View', function() {
beforeEach(() => {
	this.${path
		.basename(path.dirname(filePath))
		.replace(/[-_]/g, '')} = new ${dirName}Component();
});

it('Should run a few assertions', () => {
	expect(this.${path
		.basename(path.dirname(filePath))
		.replace(/[-_]/g, '')}).to.exist;
});
});`;
				const jsonTemplate = '{}';

				if (extension === 'sass') {
					fileContent = sassTemplate;
				} else if (extension === 'scss') {
					fileContent = scssTemplate;
				} else if (extension === 'js') {
					fileContent = jsTemplate;
				} else if (extension === 'pug') {
					fileContent = pugTemplate;
				} else if (extension === 'test.js') {
					fileContent = testTemplate;
				} else if (extension === 'json') {
					fileContent = jsonTemplate;
				}

				if (fileExist(filePath) === false) {
					fs.writeFile(
						`${dirPath}${handleComponentName()}.component.${extension}`,
						fileContent,
						err => {
							if (err) {
								return console.log(
									colors.red(`File is NOT created: ${err}`)
								);
							}
							console.log(
								'Created: ' +
									colors.green(
										`${dirPath}${handleComponentName()}.component.${extension}`
									)
							);
							if (fileCreateMsg) {
								console.warn(fileCreateMsg);
							}
						}
					);
				}
			});
		}
	});
} else {
	console.log(colors.red('Cancel operation: no block specified'));
}
