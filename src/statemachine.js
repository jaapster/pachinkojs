define(['knockout', 'underscore'], function(ko, _) {

	function array(val /* Any */) {
		return _.isArray(val) ? val : [val];
	}

	function initial(states /* Array[State] */) {
		return _.find(states, function (state) {
			return state.initial();
		});
	}

	return function(states /* Array[State] */, triggers /* Observable */) {
		var initialState = initial(states);

		if (!initialState) throw Error('No initial state specified');

		var currentState = ko.observable(initialState),
			path = ko.observableArray([initialState.name()]);

		function evaluateData() {
			var state = initial(states);
			path([]);

			do  {
				path.push(state.name());
				state = state.proceed(states);
			} while(!isInPath(state.name()));

			currentState(state);
		}

		function isInPath(name /* String */) {
			return _.indexOf(path(), name) > -1;
		}

		_.invoke(triggers, 'subscribe', evaluateData);

		return {
			evaluate: evaluateData,

			stateName: ko.computed(function() {
				return currentState() ? currentState().name() : '';
			}),

			stateIs: function(names /* Array[String] */) {
				return _.indexOf(array(names), currentState().name()) > -1;
			},

			stateInPath: isInPath
		}
	};
});