import addClass from "./_add-class";
import removeClass from "./_remove-class";

export default toggleClass = function(el, className, bool) {
	if (bool) {
		addClass(el, className);
	} else {
		removeClass(el, className);
	}
};
