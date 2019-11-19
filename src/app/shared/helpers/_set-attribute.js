export default setAttributes = function(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
};
