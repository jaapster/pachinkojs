define(['underscore', './getNextState'], function(_, getNextState) {
	function getCurrentState(state, states, visited) {
		visited = visited || [];

		var next = getNextState(state, states);

		return next && next !== state && !_.contains(visited, next)
			?  getCurrentState(next, states, visited.concat(state))
			: state;
	}

	return getCurrentState;
});