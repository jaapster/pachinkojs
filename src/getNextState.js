define(['underscore'], function(_) {
	return function (state, states) {
		var active = _.find(state.transitions, function(transition) {
			return !!transition[0]();
		});

		var name = active ? active[1] : state.name,
			next = _.find(states, function(state) {
				return state.name === name;
			});

		console.log(next, state);

		return next || state;
	}
})