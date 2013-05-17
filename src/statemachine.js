define(['knockout', 'underscore'], function(ko, _) {

	// turns a value in an array containing the value
	function array(val) {
		return _.isArray(val) ? val : [val];
	}

	// states: an array of Pachinko.State instances
	function initial(states) {
		return _.find(states, function (state) {
			return state.initial();
		});
	}

	// states: an array of Pachinko.State instances
	// triggers: an array of knockout observables
	return function(states, triggers) {
		var start = initial(states),
			currentState = ko.observable(),
			path = ko.observableArray();

		if (!start) throw Error('No initial state specified');

		// updates the current state and path
		function update() {
			currentState(start.getCurrent(states));
			path(start.getPath(states));
		}

		// if one of triggers changes value, identify the state
		_.invoke(triggers, 'subscribe', update);

		update();

		return {
			update: update,
			stateName: ko.computed(function() {
				return currentState() ? currentState().name() : '';
			}),
			stateIs: function(names) {
				return _.contains(array(names), currentState().name());
			},
			stateInPath: function(name) {
				return _.contains(path(), name);
			}
		}
	};
});