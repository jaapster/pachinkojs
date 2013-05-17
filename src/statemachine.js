define(['knockout', 'underscore'], function(ko, _) {

//	turns a value in an array containing the value
	function array(val) {
		return _.isArray(val) ? val : [val];
	}

//	states: an array of Pachinko.State instances
	function initial(states) {
		return _.find(states, function (state) {
			return state.initial();
		});
	}

//	states: an array of Pachinko.State instances
//	triggers: an array of knockout observables
	return function(states, triggers) {
		var initialState = initial(states),
			currentState = ko.observable(),
			path = ko.observableArray();

		if (!initialState) throw Error('No initial state specified');

//		evaluates what the current state should be based on the
//		evaluation of transitions and keeps track of the path
//		followed through the state diagram
		function update() {
			currentState(initialState.getCurrent(states, []));
			path(initialState.getPath(states, []));
		}

//		if one of triggers changes value, identify the state
		_.invoke(triggers, 'subscribe', update);

		update();

		return {
			update: update,
			stateName: ko.computed(function() {
				return currentState() ? currentState().name() : '';
			}),
			stateIs: function(names) {
				return _.indexOf(array(names), currentState().name()) > -1;
			},
			stateInPath: function(name) {
				return _.indexOf(path(), name) > -1;
			}
		}
	};
});