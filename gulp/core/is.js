const fs = require("fs");

const isDirectory = directoryPath => {
	let stats = false;

	try {
		stats = fs.lstatSync(directoryPath);
	} catch (error) {
		console.log("isDirectory -> ", error);
	}
	if (!!directoryPath) {
		return stats && stats.isDirectory();
	}
};

const isFile = filePath => {
	let file = false;

	try {
		file = fs.statSync(filePath);
	} catch (error) {
		console.log("isFile ->", error);
	}

	return file && !file.isDirectory();
};

const isExternal = str => {
	return (
		/^(?:https?\:)?\/\//i.test(str) ||
		str.indexOf("data:") === 0 ||
		str.charAt(0) === "#"
	);
};

const isExist = path => {
	if (fs.existsSync(path)) {
		return true;
	}
	return false;
};

module.exports = { isFile, isDirectory, isExternal };
