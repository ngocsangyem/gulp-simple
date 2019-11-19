// Pages
import { Pages } from "./pages/index";
// Shared
import { Shared } from "./shared/index";

// Share

class App {
	constructor() {
		Pages.init();
		// Shared.init();
	}

	static init() {
		const app = new App();
		return app;
	}
}

(function() {
	App.init();
})();
