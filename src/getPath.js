define(['underscore', './getNextState'], function(_, getNextState) {
	function getPath(state, states, visited) {
		visited = visited || [];

		var head = [state.name],
			next = getNextState(state, states);

		return next && next !== state && !_.contains(visited, next.name)
			? head.concat(getPath(next, states, visited.concat(head)))
			: head;
	}

	return getPath;
});