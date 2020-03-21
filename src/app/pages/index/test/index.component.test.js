import IndexComponent from '../index.component';
describe('IndexComponent View', function() {
	beforeEach(() => {
		this.index = new IndexComponent();
	});

	it('Should run a few assertions', () => {
		expect(this.index).to.exist;
	});
});
