define(['../src/transition', '../src/expression', '../src/state'], function (Transition, when, State) {

	describe('State', function() {

		var a, b, c,

			_a = function() { return a },
			_b = function() { return b },
			_c = function() { return c },

			result,

			states = [
				State({
					name: 'do foo',
					initial: true,
					transitions: [
						Transition( when (_a, 'equals', 1), 'do bar'),
						Transition( when (_a, 'equals', 2), 'do zing'),
						Transition( when (_a, 'equals', 4), 'do plork')
					]
				}),
				State({
					name: 'do bar',
					transitions: [
						Transition( when (_b, 'equals', 1), 'do zing')
					]
				}),
				State({
					name: 'do zing',
					transitions: [
						Transition( when (_c, 'equals', 1), 'do ding')
					]
				}),
				State({
					name: 'do ding',
					transitions: [
						Transition( when (_b, 'equals', 1), 'do foo')
					]
				}),
				State({
					name: 'do zork',
					transitions: []
				})
			];

		it('should return its name', function () {
			expect(states[0].name()).equals('do foo');
		});

		it('should return its initial flag', function () {
			expect(states[0].initial()).equals(true);
			expect(states[1].initial()).equals(false);
		})

		describe('nextState', function() {
			it('should return the correct next state', function () {
				a = 1;

				result = states[0].nextState(states);
				expect(result).equal(states[1]);

				a = 2;

				result = states[0].nextState(states);
				expect(result).equal(states[2]);
			});

			it('should return itself if none of its transitions evaluate to true', function () {
				a = 8;

				result = states[0].nextState(states);
				expect(result).equal(states[0]);
			});

			it('should return itself if the next state can not be found', function () {
				a = 4;

				result = states[0].nextState(states);
				expect(result).equal(states[0]);
			});
		})

		describe('getCurrent', function() {
			it('should return the correct current state', function () {
				a = 1;
				b = 2;

				result = states[0].getCurrent(states);
				expect(result).equal(states[1]);

				a = 1;
				b = 1;

				result = states[0].getCurrent(states);
				expect(result).equal(states[2]);

				a = 2;
				b = 1;

				result = states[0].getCurrent(states);
				expect(result).equal(states[2]);

				a = 2;
				c = 1;

				result = states[0].getCurrent(states);
				expect(result).equal(states[3]);
			});

			it('should prevent loops', function () {
				a = 2;
				b = 1;
				c = 1;

				result = states[0].getCurrent(states);
				expect(result).equal(states[3]);
			});
		})
	})
});