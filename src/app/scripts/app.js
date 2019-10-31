import {
	HeaderComponent,
	FooterComponent,
	AboutComponent,
	About1Component
} from '../components/index';

class App {
	constructor() {
		HeaderComponent();
		FooterComponent();
		AboutComponent();
		About1Component();
	}

	static factory() {
		const app = new App();
		return app;
	}
}

App.factory();
