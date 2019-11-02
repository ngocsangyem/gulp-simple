import { HeaderComponent, FooterComponent } from '../components/index';
import { ButtonPrimaryComponent, PopupSignUpComponent } from '../shared/index';

class App {
	constructor() {
		HeaderComponent();
		FooterComponent();
		ButtonPrimaryComponent();
		PopupSignUpComponent();
	}

	static init() {
		const app = new App();
		return app;
	}
}

(function() {
	App.init();
})();
