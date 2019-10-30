// inject:jsComponentFile
import AboutTestComponent from '../components/about-test/about-test.component';
import FooterComponent from '../components/footer/footer.component';
import HeaderComponent from '../components/header/header.component';
// endinject

class App {
	constructor() {
		HeaderComponent();
		FooterComponent();
	}

	static factory() {
		const app = new App();
		return app;
	}
}

App.factory();
