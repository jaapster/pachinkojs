define(['underscore', './getNextState'], function(_, getNextState) {
	function getCurrent(state, states, visited) {
		visited = visited || [];

		var next = getNextState(states, state);

		if (next === state || _.contains(visited, next)) {
			return state;
		} else {
			return getCurrent(next, states, visited.concat(state));
		}
	}

	return getCurrent;
});