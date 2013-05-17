/*globals requirejs, expect, IPESeleniumRunner*/

requirejs.config({

	paths: {
		'mocha': '../libs/mocha/mocha',
		'chai': '../libs/chai/chai'
	},

	shim: {
		'mocha': {
			exports: 'mocha'
		},
		'chai': {
			exports: 'chai'
		}
	}

});

define([
	'mocha',
	'chai'

], function (mocha, chai) {

	mocha.setup({
		ui:'bdd',
		ignoreLeaks:true,
		timeout: 123456
	});
	expect = chai.expect;

	return function (options) {

		var config = {
			baseUrl: options.baseUrl || '../../',
			paths: {}
		};


		// requirejs test configuration
		requirejs.config(config);
		requirejs(options.files, function () {

			mocha.run(function() {
				if (window.mochaDone) {
					window.mochaDone();
				}
			});
		});

	};

});