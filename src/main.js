define([
	'./statemachine',
	'./expression',
	'./getObservable',
	'./getObservableObject'
], function(main, expression, getObservable, getObservableObject) {

	main.Expression = expression;
	main.getObservable = getObservable;
	main.getObservableObject = getObservableObject;

	return main;
});