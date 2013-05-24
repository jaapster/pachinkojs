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
		knockout: '../libs/knockout-latest',
		'jquery': '../libs/jquery'
	},

	shim: {
		'underscore': {
			exports: '_'
		}
	}
});
