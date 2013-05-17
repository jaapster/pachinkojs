define(['./statemachine', './state', './expression', './transition', 'knockout'],
	function(statemachine, state, expression, transition, ko) {

	var Pachinko = statemachine;
		Pachinko.State = state;
		Pachinko.Expression = expression;
		Pachinko.Transition = transition;
		Pachinko.Observable = ko.observable;
		Pachinko.ObservableArray = ko.observableArray;

	return Pachinko;
})