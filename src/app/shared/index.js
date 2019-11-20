// Components
import {
	ButtonPrimaryComponent,
	HeaderComponent,
	FooterComponent
} from "./components/index";

export class Shared {
	constructor() {
		new HeaderComponent();
		new FooterComponent();
		new ButtonPrimaryComponent();
	}

	static init() {
		const shared = new Shared();
		return shared;
	}
}
