// inject:jsComponentFile
import HeaderIndex from '../components/header/index';
import FooterIndex from '../components/footer/index';
// endinject

class App {
	constructor() {
		HeaderIndex();
		FooterIndex();
	}

	static factory() {
		const app = new App();
		return app;
	}
}

App.factory();
