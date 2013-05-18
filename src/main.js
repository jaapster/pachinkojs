define(['./statemachine', './expression'],
	function(statemachine, expression) {

	var Pachinko = statemachine;
		Pachinko.Expression = expression;

	return Pachinko;
})