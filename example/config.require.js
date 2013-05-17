requirejs.config({
	//baseUrl: '..',

	packages: [
		{
			name: "pachinko",
			location: "../src",
			main: "main"
		}
	],

	paths: {
		// base libraries
		underscore:					'../libs/lodash',
		knockout:					'../libs/knockout-latest'
	},

	shim: {
		'underscore': {
			exports: '_'
		}
	}
});
