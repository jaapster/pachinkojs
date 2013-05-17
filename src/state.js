define(['underscore'], function(_){
	var State = function(options) {
		return {
			// get the next state based on evaluating this states transitions
			nextState: function(states) {
				var activeTransition = _.find(options.transitions, function(transition) {
					return transition(states);
				});

				return activeTransition ? activeTransition(states) : this;
			},

			getCurrent: function (states, visited) {
				var next = this.nextState(states);

				if (next === this || _.contains(visited, next)) {
					return this;
				} else {
					return next.getCurrent(states, visited.concat(this));
				}
			},

			getPath: function(states, visited) {
				var next = this.nextState(states);

				if (next === this || _.contains(visited, next.name())) {
					return [this.name()];
				} else {
					return [this.name()].concat(next.getPath(states, visited.concat([this.name()])));
				}
			},

			name: function() {
				return options.name;
			},

			initial: function() {
				return options.initial;
			},

			_name: options.name
		}
	};

	return State;
});