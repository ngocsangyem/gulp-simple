export default scrollTo = function(final, duration, cb, scrollEl) {
	var element = scrollEl || window;
	var start = element.scrollTop || document.documentElement.scrollTop,
		currentTime = null;

	if (!scrollEl) start = window.scrollY || document.documentElement.scrollTop;

	var animateScroll = function(timestamp) {
		if (!currentTime) currentTime = timestamp;
		var progress = timestamp - currentTime;
		if (progress > duration) progress = duration;
		var val = Math.easeInOutQuad(progress, start, final - start, duration);
		element.scrollTo(0, val);
		if (progress < duration) {
			window.requestAnimationFrame(animateScroll);
		} else {
			cb && cb();
		}
	};

	window.requestAnimationFrame(animateScroll);
};
