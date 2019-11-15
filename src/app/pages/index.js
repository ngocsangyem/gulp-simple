// Components

// Views
import { IndexComponent } from './views/index';

export class Pages {
	constructor() {
		new IndexComponent();
	}

	static init() {
		const pages = new Pages();
		return pages;
	}
}
