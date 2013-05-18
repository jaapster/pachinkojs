define(['knockout', 'underscore', './getCurrentState', './getPath'], function(ko, _, getCurrent, getPath) {
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
	return function(states, triggers) {
		var start = initial(states),
			currentState = ko.observable(),
			path = ko.observableArray();

		if (!start) throw Error('No initial state specified');

		// updates the current state and path
		function update() {
			currentState(getCurrent(start, states));
			path(getPath(start, states));
		}

		// if one of triggers changes value, identify the state
		_.invoke(triggers, 'subscribe', update);

		update();

		return {
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