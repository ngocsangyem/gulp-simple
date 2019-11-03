import FooterComponent from './footer.component';
describe('FooterComponent View', function() {
beforeEach(() => {
	this.footer = new FooterComponent();
});

it('Should run a few assertions', () => {
	expect(this.footer).to.exist;
});
});