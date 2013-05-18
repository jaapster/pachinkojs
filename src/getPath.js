define(['underscore', './getNextState'], function(_, getNextState) {
	function getPath(state, states, visited) {
		visited = visited || [];

		var next = getNextState(states, state),
			name = next.name;

		if (next === state || _.contains(visited, name)) {
			return [name];
		} else {
			var tail = getPath(next, states, visited.concat([name]));
			return [name].concat(tail);
		}
	}

	return getPath;
});