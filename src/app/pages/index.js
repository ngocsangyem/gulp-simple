// Components
import { HeaderComponent, FooterComponent } from './components/index';

// Views
import { IndexComponent } from './views/index';

export class Pages {
	constructor() {
		new HeaderComponent();
		new FooterComponent();
		new IndexComponent();
	}

	static init() {
		const pages = new Pages();
		return pages;
	}
}
