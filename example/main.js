define(['pachinko', 'knockout', 'underscore'], function(Pachinko, ko, _) {

	var State = Pachinko.State,
		Transition = Pachinko.Transition,
		when = Pachinko.Expression;

	var model = {
		name: ko.observable(),
		age: ko.observable()
	};

	_.extend(model, {
		logic: Pachinko([
			State({
				name: 'asking the age',
				initial: true,
				transitions: [
					Transition( when(model.age, 'is greater than', 17), 'notifying old enough'),
					Transition( when(model.age, 'is less than', 18), 'notifying not old enough')
				]
			}),
			State({
				name: 'notifying old enough',
				transitions: []
			}),
			State({
				name: 'notifying not old enough',
				transitions: []
			})
		], [
			model.age
		])
	});

	ko.applyBindings(model);

});