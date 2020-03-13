import { HeaderComponent } from '../header.component';

describe('HeaderComponent View', function() {

	beforeEach(() => {
		this.Header = new HeaderComponent();
	});

	it('Should run a few assertions', () => {
		expect(this.Header).to.exist;
	});

});