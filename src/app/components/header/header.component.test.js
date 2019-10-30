import HeaderComponent from './header.component';
describe('HeaderComponent View', function() {
beforeEach(() => {
	this.header = new HeaderComponent();
});

it('Should run a few assertions', () => {
	expect(this.header).to.exist;
});
});