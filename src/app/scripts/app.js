import { HeaderComponent, FooterComponent } from '../components/index';
import { ButtonPrimaryComponent } from '../shared/index';

class App {
	constructor() {
		HeaderComponent();
		FooterComponent();
		ButtonPrimaryComponent();
	}

	static init() {
		const app = new App();
		return app;
	}
}

(function() {
	App.init();
})();
