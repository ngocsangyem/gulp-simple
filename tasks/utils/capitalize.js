const Capitalize = s => {
	if (typeof s !== 'string') return '';
	let text = s.charAt(0).toUpperCase() + s.slice(1);
	return text.replace(/\.[^.]*$/, '').replace(/[-_]/g, '');
};

module.exports = Capitalize;
