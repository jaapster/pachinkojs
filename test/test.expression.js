define(['../src/expression'], function (Expression) {

	describe('Expression', function() {
		describe('operators', function () {
			it('equals: two unequal numbers', function () {
				expect(Expression(17, 'equals', 12)()).equal(false);
			});
			it('equals: two equal numbers', function () {
				expect(Expression(17, 'equals', 17)()).equal(true);
			});
			it('equals: typecheck 17 equals "17"', function () {
				expect(Expression(17, 'equals', '17')()).equal(false);
			});
			it('equals: two equal strings', function () {
				expect(Expression('foo', 'equals', 'foo')()).equal(true);
			});
			it('equals: two unequal strings', function () {
				expect(Expression('foo', 'equals', 'bar')()).equal(false);
			});
			it('has a value: string', function () {
				expect(Expression('foo', 'has a value')()).equal(true);
			});
			it('has a value: empty string', function () {
				expect(Expression('', 'has a value')()).equal(false);
			});
			it('has a value: empty array', function () {
				expect(Expression([], 'has a value')()).equal(false);
			});
			it('has no value: string', function () {
				expect(Expression('foo', 'has no value')()).equal(false);
			});
			it('has no value: empty string', function () {
				expect(Expression('', 'has no value')()).equal(true);
			});
			it('has no value: empty array', function () {
				expect(Expression([], 'has no value')()).equal(true);
			});
			it('has no value: undefined', function () {
				expect(Expression(undefined, 'has no value')()).equal(true);
			});
			it('has no value: null', function () {
				expect(Expression(null, 'has no value')()).equal(true);
			});
		});
	})
});