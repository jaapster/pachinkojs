requirejs.config({
	packages: [
		{
			name: "pachinko",
			location: "../src",
			main: "main"
		}
	],

	paths: {
		underscore: '../libs/lodash',
		knockout: '../libs/knockout-latest'
	},

	shim: {
		'underscore': {
			exports: '_'
		}
	}
});
