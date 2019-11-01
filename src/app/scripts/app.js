import { HeaderComponent, FooterComponent } from '../components/index';

class App {
	constructor() {
		HeaderComponent();
		FooterComponent();
	}

	static init() {
		const app = new App();
		return app;
	}
}

(function() {
	App.init();
})();
