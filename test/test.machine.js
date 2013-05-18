define(['../src/expression', '../src/statemachine'], function (when, Machine) {

	var a, b, c,

		_a = function() { return a },
		_b = function() { return b },
		_c = function() { return c },

		result,

		states = [
			{
				name: 'do foo',
				initial: true,
				transitions: [
					[ when (_a, 'equals', 1), 'do bar'],
					[ when (_a, 'equals', 2), 'do zing'],
					[ when (_a, 'equals', 4), 'do plork']
				]
			},
			{
				name: 'do bar',
				transitions: [
					[ when (_b, 'equals', 1), 'do zing']
				]
			},
			{
				name: 'do zing',
				transitions: [
					[ when (_c, 'equals', 1), 'do ding']
				]
			},
			{
				name: 'do ding',
				transitions: [
					[ when (_b, 'equals', 1), 'do foo']
				]
			},
			{
				name: 'do zork',
				transitions: []
			}
		],

		machine = Machine(states);
});