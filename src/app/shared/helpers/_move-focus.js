export default moveFocus = function(element) {
	if (!element) element = document.getElementsByTagName("body")[0];
	element.focus();
	if (document.activeElement !== element) {
		element.setAttribute("tabindex", "-1");
		element.focus();
	}
};
