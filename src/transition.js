define(['underscore'], function(_){
	return function(expression, targetStateName) {
		var fn = function() {
			// evaluating the expression return true or false
			// true means we may follow this transition to its target state
			var result = expression();

			if (pass) {
				// lookup the next state based on the target state name
				return _.find(states, function(state) {
					return state.name() === targetStateName;
				});
			}

			return false;
		};

		return fn;
	};
});