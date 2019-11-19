import hasClass from "./_has-class";

export default getChildrenByClassName = function(el, className) {
	var children = el.children,
		childrenByClass = [];
	for (var i = 0; i < children.length; i++) {
		if (hasClass(el.children[i], className)) {
			childrenByClass.push(el.children[i]);
		}
	}
	return childrenByClass;
};
