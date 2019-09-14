// inject:jsComponentFile
import FooterIndex from '../components/footer/index';
import HeaderIndex from '../components/header/index';
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
