define(['../src/expression', '../src/getPath'], function (when, getPath) {

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

	describe('getPath', function() {
		it('should return the correct path to the current state', function () {
			a = 1;

			result = getPath(states[0], states);
			expect(result).eql(['do foo', 'do bar']);

			a = 1;
			b = 1;

			result = getPath(states[0], states);
			expect(result).eql(['do foo', 'do bar', 'do zing']);
		});

		it('should prevent loops', function () {
			a = 1;
			b = 1;
			c = 1;

			result = getPath(states[0], states);
			expect(result).eql(['do foo', 'do bar', 'do zing', 'do ding']);
		});
	});
});