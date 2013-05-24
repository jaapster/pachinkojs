define(['knockout', 'underscore'], function(ko, _) {
	return function getObservableObject(obj) {
		var _isChanged = false,
			nu = {};

		_.each(obj, function(value, key) {
			nu[key].subscribe(function() {
				_isChanged = true;
			});
		});

		nu.changed = function () {
			var changed = _isChanged;
			_isChanged = false;
			return changed;
		};

		return nu;
	}
});