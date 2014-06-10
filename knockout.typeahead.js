(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["knockout", "jquery", "typeahead"], factory);
	} else {
		// Browser globals
		factory(ko, $);
	}
}(this, function(ko, $) {
	ko.bindingHandlers.typeahead = {
		init: function(element, options, allBindingsAccessor) {
			// http://stackoverflow.com/a/19366003/1247130 get value to update properly when typeahead choice is selected
			var
				allBindings = allBindingsAccessor(),
				updateValues = function(val) {
					allBindings.value(val);
				},
				suggestions = new Bloodhound({
					datumTokenizer: function(token) {
						return Bloodhound.tokenizers.whitespace(token);
					},
					queryTokenizer: Bloodhound.tokenizers.whitespace,
					remote: ko.unwrap(options())
				});

			suggestions.initialize();

			$(element).typeahead({
				hint: true,
				highlight: true
			}, {
				source: suggestions.ttAdapter(),
				display: function(item) {
					return item;
				}
			}).on('typeahead:selected', function(el, item) {
				updateValues(item);
			}).on('typeahead:autocompleted', function(el, item) {
				updateValues(item);
			});
		}
	};
}));