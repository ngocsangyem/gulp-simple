// Components
import { Components } from "./components/index";

// Pages
import { Pages } from "./pages/index";

class App {
	constructor() {
		Components.init();
		Pages.init();
	}

	static init() {
		const app = new App();
		return app;
	}
}

(function() {
	App.init();
})();
