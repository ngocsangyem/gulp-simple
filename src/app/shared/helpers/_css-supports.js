export default cssSupports = function(property, value) {
	if ("CSS" in window) {
		return CSS.supports(property, value);
	} else {
		var jsProperty = property.replace(/-([a-z])/g, function(g) {
			return g[1].toUpperCase();
		});
		return jsProperty in document.body.style;
	}
};
