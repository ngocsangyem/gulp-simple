import ButtonPrimaryComponent from '../button-primary.component';
describe('ButtonPrimaryComponent View', function() {
	beforeEach(() => {
		this.buttonPrimary = new ButtonPrimaryComponent();
	});

	it('Should run a few assertions', () => {
		expect(this.buttonPrimary).to.exist;
	});
});
