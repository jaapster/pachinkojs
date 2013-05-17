define(['underscore'], function(_){
	return function(expression, targetStateName) {
		return function(states) {
			var pass = expression();

			if (pass) {
				if (states) {
					return _.find(states, function(state) {
						return state.name() === targetStateName;
					});
				} else {
					return targetStateName;
				}
			}

			return false;
		}
	};
});