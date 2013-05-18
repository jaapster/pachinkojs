define(['underscore'], function(_){
	var State = function(options) {

		return {
			nextState: function(states) {
				var activeTransition = _.find(options.transitions, function(transition) {
					return transition(states);
				}, this);

				return activeTransition ? activeTransition(states) : this;
			},

			getCurrent: function (states, visited) {
				visited = visited || [];

				var next = this.nextState(states);

				if (next === this) {
					return this;
				} else if (_.contains(visited, next)) {
					return this;
				} else {
					return next.getCurrent(states, visited.concat(this));
				}
			},

			getPath: function(states, visited) {
				visited = visited || [];

				var next = this.nextState(states),
					name = this.name();

				if (next === this) {
					return name;
				} else if (_.contains(visited, name)) {
					return [name];
				} else {
					var tail = next.getPath(states, visited.concat([name]));
					return [name].concat(tail);
				}
			},

			name: function() {
				return options.name;
			},

			initial: function() {
				return !!options.initial;
			},

			_name: options.name

		}
	};

	return State;
});