define(['underscore'], function(_) {
	return function() {
		function executable(expression) {
			return _.isFunction(expression) ? expression : function() { return expression };
		}

		var left = 		executable(arguments[0]),
			right = 	executable(arguments[2]),
			operator = 	executable(arguments[1]);

		function hasValue(executable) {
			return typeof executable() !== 'undefined' && executable() !== '' && executable().length !== 0;
		}

		return function evalExpression() {
			switch(operator()) {
				case 'equals':			return left() === right();
				case 'is greater than':	return left() > right();
				case 'is less than':	return left() < right();
				case 'is truthy':		return !!left();
				case 'is falsy':		return !!!left();
				case 'has a value':		return hasValue(left);
				case 'has no value':	return !hasValue(left);
				case 'or':				return left() || right();
				case 'and':				return left() && right();
				case '+':				return left() + right();
				case '-':				return left() - right();
				case '/':				return left() / right();
				case '*':				return left() * right();
				default:				throw new Error('Invalid expression operator: ' + operator());
			}
		}
	};
});