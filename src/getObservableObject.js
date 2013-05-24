define(['knockout', 'underscore'], function(ko, _) {
	return function getObservableObject(obj) {
		var _isChanged = false;

		_.each(obj, function(value, key) {
			obj[key].subscribe(function(){
				_isChanged = true;
			});
		});

		obj.changed = function () {
			var changed =  _isChanged;
			_isChanged = false;
			return changed;
		};

		return obj;
	}
});