const { CapitalizeWord } = require("./capitalize.js");
const { UpperFirstLetter } = require("./upper-first-letter");

const ReplaceName = (string, name) => {
	return string
		.replace(/\[capitalize-name\]/g, CapitalizeWord(name))
		.replace(/\[name\]/g, name)
		.replace(/\[upper-first-name\]/g, UpperFirstLetter(name));
};

module.exports = { ReplaceName };
