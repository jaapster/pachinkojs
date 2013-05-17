define(['underscore'], function(_){
	var State = function(options /* Object */) {
		return {
			proceed: function(states /* Array[State] */) {
				var hit = _.find(options.transitions, function(transition /* Transition */) {
					return transition(states);
				});

				return hit ? hit(states) : this;
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