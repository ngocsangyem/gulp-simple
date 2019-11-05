// Components
import { ButtonPrimaryComponent } from './components/index';

// Popups
import { PopupSignUpComponent } from './popup/index';

export class Shared {
	constructor() {
		new ButtonPrimaryComponent();
		new PopupSignUpComponent();
	}

	static init() {
		const shared = new Shared();
		return shared;
	}
}
