// Views
import { IndexComponent } from "./home/index.component";

export class Pages {
	constructor() {
		new IndexComponent();
	}

	static init() {
		const pages = new Pages();
		return pages;
	}
}
