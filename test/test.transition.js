define(['../src/transition'], function (Transition) {

	describe('Transition', function() {

		function truth() {return true}
		function untruth() {return false}

		var states = [{
			name: function() {return 'fooState'}
		}, {
			name: function() {return 'barState'}
		}];

		it('should return correct state name when its expression evaluates to true', function () {
			var result = Transition(truth, 'fooState')(states);
			expect(result).equal(states[0]);
		});

		it('should return false name when its expression evaluates to false', function () {
			var result = Transition(untruth, 'fooState')(states);
			expect(result).equal(false);
		});
	})
});