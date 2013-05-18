define(['pachinko', 'knockout', 'underscore'], function(Pachinko, ko, _) {

	var when = Pachinko.Expression;

	var model = {
		licensePlate: ko.observable(),
		licensePlateKnown: ko.observable(),
		signCode: ko.observable(),
		signCodeKnown: ko.observable(),
		registrationNumber: ko.observable()
	};

	var p = Pachinko([
		{
			name: 'asking if the license plate is know',
			initial: true,
			transitions: [
				[ when(model.licensePlateKnown, 'equals', 'yes'), 'asking the license plate'],
				[ when(model.licensePlateKnown, 'equals', 'no'), 'asking the registration number']
			]
		},{
			name: 'asking the license plate',
			transitions: [
				[ when(model.licensePlate, 'has a value'), 'asking if the sign code is known']
			]
		},{
			name: 'asking if the sign code is known',
			transitions: [
				[ when(model.signCodeKnown, 'equals', 'yes'), 'asking the sign code'],
				[ when(model.signCodeKnown, 'equals', 'no'), 'asking the registration number']
			]
		},{
			name: 'asking the sign code',
			transitions: [
				[ when(model.signCode, 'has a value'), 'showing the summary']
			]
		},{
			name: 'asking the registration number',
			transitions: [
				[ when(model.registrationNumber, 'has a value'), 'showing the summary']
			]
		},{
			name: 'showing the summary',
			transitions: []
		}
	], [
		model.licensePlate,
		model.licensePlateKnown,
		model.signCode,
		model.signCodeKnown,
		model.registrationNumber
	]);

	_.extend(model, {
		logic: p
	});

	ko.applyBindings(model);

});