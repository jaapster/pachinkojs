define(['../src/expression', '../src/getNextState'], function (when, getNextState) {

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
		];

	describe('getNextState', function() {
		it('should return the correct next state for a state', function () {
			a = 1;

			result = getNextState(states, states[0]);
			expect(result).equal(states[1]);

			a = 2;

			result = getNextState(states, states[0]);
			expect(result).equal(states[2]);
		});

		it('should return the given state if none of its transitions evaluate to true', function () {
			a = 8;

			result = getNextState(states, states[0]);
			expect(result).equal(states[0]);
		});

		it('should return itself if the next state can not be found', function () {
			a = 4;

			result = getNextState(states, states[0]);
			expect(result).equal(states[0]);
		});
	});
});