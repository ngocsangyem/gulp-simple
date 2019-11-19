import hasClass from "./_has-class";

export default removeClass = function(el, className) {
	var classList = className.split(" ");
	if (el.classList) {
		el.classList.remove(classList[0]);
	} else if (hasClass(el, classList[0])) {
		var reg = new RegExp("(\\s|^)" + classList[0] + "(\\s|$)");
		el.className = el.className.replace(reg, " ");
	}
	if (classList.length > 1) {
		removeClass(el, classList.slice(1).join(" "));
	}
};
