import HeaderIndex from './index';

describe('Header View', function() {
	beforeEach(() => {
		this.header = new HeaderIndex();
	});

	it('Should run a few assertions', () => {
		expect(this.header).to.exist;
	});
});
