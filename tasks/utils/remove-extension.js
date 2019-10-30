const RemoveExtension = word => {
	if (typeof word !== 'string') return '';
	return word.replace(/(\.[^/.]+)+$/, '');
};

module.exports = RemoveExtension;
