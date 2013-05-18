define(['underscore', './getNextState'], function(_, getNextState) {
	function getCurrentState(state, states, visited) {
		visited = visited || [];

		var next = getNextState(state, states);

		if (next === state || _.contains(visited, next)) {
			return state;
		} else {
			return getCurrentState(next, states, visited.concat(state));
		}
	}

	return getCurrentState;
});