define(['../src/expression', '../src/getCurrentState'], function (when, getCurrentState) {

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

	describe('getCurrentState', function() {
		it('should return the correct current state', function () {
			a = 1;
			b = 2;

			result = getCurrentState(states[0], states);
			expect(result).equal(states[1]);

			a = 1;
			b = 1;

			result = getCurrentState(states[0], states);
			expect(result).equal(states[2]);

			a = 2;
			b = 1;

			result = getCurrentState(states[0], states);
			expect(result).equal(states[2]);

			a = 2;
			c = 1;

			result = getCurrentState(states[0], states);
			expect(result).equal(states[3]);
		});

		it('should prevent loops', function () {
			a = 2;
			b = 1;
			c = 1;

			result = getCurrentState(states[0], states);
			expect(result).equal(states[3]);
		});
	})
});