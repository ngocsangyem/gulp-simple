export default is = function(elem, selector) {
	if (selector.nodeType) {
		return elem === selector;
	}

	var qa =
			typeof selector === "string"
				? document.querySelectorAll(selector)
				: selector,
		length = qa.length,
		returnArr = [];

	while (length--) {
		if (qa[length] === elem) {
			return true;
		}
	}

	return false;
};
