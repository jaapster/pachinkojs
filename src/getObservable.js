define(['knockout', 'underscore'], function(ko, _) {
	function getObservable(value) {
		var observable = ko.observable(value);

		var _isChanged = false;

		observable.subscribe(function(){
			_isChanged = true;
		});

		observable.changed = function () {
			var changed =  _isChanged;
			_isChanged = false;
			return changed;
		};

		return observable;
	}
});