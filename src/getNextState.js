define(['underscore'], function(_) {
	function stateByName(states, name) {
		return _.find(states, function(state) {
			return state.name === name;
		});
	}

	return function (states, state) {
		var activeTransition = _.find(state.transitions, function(transition) {
			return !!transition[0]();
		});

		var name = activeTransition ? activeTransition[1] : state.name;
		var next = stateByName(states, name);

		return next || state;
	}
})