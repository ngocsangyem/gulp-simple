export class IndexComponent {
	constructor() {
		console.log("This is IndexComponent");
	}

	static init() {
		const app = new IndexComponent();
		return app;
	}
}

(function() {
	IndexComponent.init();
})();
