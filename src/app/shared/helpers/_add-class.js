import hasClass from "./_has-class";

export default addClass = function(el, className) {
	var classList = className.split(" ");
	if (el.classList) {
		el.classList.add(classList[0]);
	} else if (!hasClass(el, classList[0])) {
		el.className += " " + classList[0];
	}
	if (classList.length > 1) {
		addClass(el, classList.slice(1).join(" "));
	}
};
