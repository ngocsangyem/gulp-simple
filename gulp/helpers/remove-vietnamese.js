const RemoveVietnamese = word => {
	if (typeof word !== 'string') return '';
	let wordTranform = word.toLowerCase().replace(/\s+/g, '-');
	non_asciis = {
		'-': '[`~!@#$%^&*()_|+=?;:",.<>/]',
		a: '[ảàạảãàáâãäåắặẳằẵấầẩẫậâă]',
		ae: 'æ',
		c: 'ç',
		e: '[èéẹẽẻềệếểễê]',
		d: '[đ]',
		i: '[ìíîïị]',
		n: 'ñ',
		o: '[òóọôõöộồốổỗơởợỡờớôơ]',
		oe: 'œ',
		u: '[ùúûűüủụưửựứừữư]',
		y: '[ýỳỷỵỹ]'
	};
	for (i in non_asciis) {
		wordTranform = wordTranform.replace(new RegExp(non_asciis[i], 'gi'), i);
	}
	wordTranform = wordTranform.replace(/[^\w\s]/gi, '-');
	return wordTranform;
};

module.exports = RemoveVietnamese;
