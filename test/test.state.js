define(['../src/transition', '../src/expression', '../src/state'], function (Transition, Expression, State) {

	describe('State', function() {

		var a, b, c,

			_a = function() { return a },
			_b = function() { return b },
			_c = function() { return c},

			result;

		var states = [
			State({
				name: 'foo',
				transitions: [
					Transition(Expression(_a, 'equals', 1), 'bar'),
					Transition(Expression(_a, 'equals', 2), 'zing'),
					Transition(Expression(_a, 'equals', 4), 'plork')
				]
			}),
			State({
				name: 'bar',
				transitions: [
					Transition(Expression(_b, 'equals', 1), 'zing')
				]
			}),
			State({
				name: 'zing',
				transitions: [
					Transition(Expression(_c, 'equals', 1), 'ding')
				]
			}),
			State({
				name: 'ding',
				transitions: [
					Transition(Expression(_b, 'equals', 1), 'foo')
				]
			}),
			State({
				name: 'zork',
				transitions: []
			})
		];

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
			it('should return the correct next state', function () {
				a = 1;
				b = 2

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