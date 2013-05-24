define(['knockout', 'underscore', './getCurrentState', './getPath'], function(ko, _, getCurrentState, getPath) {
	// turns a value in an array containing the value
	function array(val) {
		return _.isArray(val) ? val : [val];
	}

	// states: an array of state objects
	function initial(states) {
		return _.find(states, function (state) {
			return state.initial;
		});
	}

	// states: an array of state objects
	// triggers: an array of knockout observables
	return function(states, triggers, persistent) {
		var start = initial(states),
			current = start,
			currentState = ko.observable(),
			path = ko.observableArray();

		var onUpdate = null;

		if (!start) throw Error('No initial state specified');

		// updates the current state and path
		function update() {
			var init = persistent ? current : start;

			currentState(getCurrentState(init, states));
			path(getPath(init, states));

			current = currentState();
		}

		// if one of triggers changes value, identify the state
		_.invoke(triggers, 'subscribe', update);

		update();

		return {
			update: update,

			reset: function () {
				current = start;
				update();
			},

			stateName: ko.computed(function() {
				return currentState() ? currentState().name : '';
			}),

			stateIs: function(names) {
				return _.contains(array(names), currentState().name);
			},

			stateInPath: function(name) {
				return _.contains(path(), name);
			}
		}
	};
});