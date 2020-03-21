// Views
import { IndexComponent } from "./index/index.component";

export class Pages {
	constructor() {
		new IndexComponent();
	}

	static init() {
		const pages = new Pages();
		return pages;
	}
}
