export default hasClass = function(el, className) {
	if (el.classList) {
		return el.classList.contains(className);
	} else {
		return !!el.className.match(
			new RegExp("(\\s|^)" + className + "(\\s|$)")
		);
	}
};
