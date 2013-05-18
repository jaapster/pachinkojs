define(['pachinko', 'knockout', 'underscore'], function(Pachinko, ko, _) {

	var when = Pachinko.Expression;

	var model = {
		name: ko.observable(),
		age: ko.observable()
	};

	var p = Pachinko([
		{
			name: 'asking the age',
			initial: true,
			transitions: [
				[ when(model.age, 'is greater than', 17), 'notifying old enough' ],
				[ when(model.age, 'is less than', 18), 'notifying not old enough' ]
			]
		},{
			name: 'notifying old enough',
			transitions: [
				[ when(model.age, 'is greater than', 17), 'asking the age' ]
			]
		},{
			name: 'notifying not old enough',
			transitions: []
		}
	], [
		model.age
	]);

	_.extend(model, {
		logic: p
	});

	ko.applyBindings(model);

});