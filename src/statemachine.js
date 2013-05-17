define(['knockout', 'underscore'], function(ko, _) {

	/*
		turns a value in an array containing the value
	 */
	function array(val) {
		return _.isArray(val) ? val : [val];
	}

	/*
		states: an array of Pachinko.State instances
	*/
	function initial(states) {
		return _.find(states, function (state) {
			return state.initial();
		});
	}

	/*
		states: an array of Pachinko.State instances
		triggers: an array of knockout observables
	 */
	return function(states, triggers) {
		var initialState = initial(states);
		if (!initialState) throw Error('No initial state specified');

		/*
			contains the currentState object
		 */
		var currentState = ko.observable(initialState);

		/*
			array of state names, contains the path followed including the current state
		*/
		var path = ko.observableArray([initialState.name()]);

		/*
			evaluates what the current state should be based on the
			evaluation of transitions and keeps track of the path
			followed through the state diagram
		 */
		function evaluateData() {
			var state = initialState;
			path([]);

			do  {
				path.push(state.name());
				state = state.proceed(states);
			} while(!isInPath(state.name()));

			currentState(state);
		}
		/*
			name: string
			returns true the names is in the path leading to the current state
		 */
		function isInPath(name) {
			return _.indexOf(path(), name) > -1;
		}

		/*
			if one of triggers changes value, evaluate the data
		 */
		_.invoke(triggers, 'subscribe', evaluateData);

		return {
			evaluate: evaluateData,

			/*
				returns the name of the current state
			*/
			stateName: ko.computed(function() {
				return currentState() ? currentState().name() : '';
			}),

			/*
				names: an array of strings
				returns true if one of the names is the current state name
			 */
			stateIs: function(names) {
				return _.indexOf(array(names), currentState().name()) > -1;
			},

			stateInPath: isInPath
		}
	};
});