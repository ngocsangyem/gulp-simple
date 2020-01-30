const removeExtension = word => {
	if (typeof word !== "string") return "";
	return word.replace(/(\.[^/.]+)+$/, "");
};

module.exports = {
	removeExtension
}
