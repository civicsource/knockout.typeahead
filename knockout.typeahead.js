var ko = require("knockout");
var $ = require("jquery");

// hack to make typeahead work because it expects a global
if (window && !window.jQuery) {
	window.jQuery = $;
}

require("typeahead.js");
require("./typeahead.less");

ko.bindingHandlers.typeahead = {
	update: function (element, valueAccessor, allBindings) {
		// http://stackoverflow.com/a/19366003/1247130 get value to update properly when typeahead choice is selected.

		var templateName = ko.unwrap(allBindings().templateName);
		var mapping = ko.unwrap(allBindings().mappingFunction);
		var onSelect = allBindings.get("onSelectFunction");
		var displayedProperty = ko.unwrap(allBindings().displayKey);
		var user_typeahead_options = ko.unwrap(allBindings().typeaheadOpts) || {};
		var value = allBindings.get("value");

		var url = ko.unwrap(valueAccessor());
		var remoteFilter = ko.unwrap(allBindings.get("remoteFilter"));
		var auth = (allBindings.has("authToken")) ? {
			"Authorization": "Bearer " + ko.unwrap(allBindings().authToken)
		} : {};
		var remoteData = {
			url: url,
			ajax: {
				headers: auth
			}
		};
		if (remoteFilter) {
			remoteData.filter = remoteFilter;
		};

		var resultsLimit = allBindings.get("limit") || 10;

		var suggestions = new Bloodhound({
			datumTokenizer: function (token) {
				return Bloodhound.tokenizers.whitespace(token);
			},
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: remoteData,
			limit: resultsLimit
		});

		suggestions.initialize();

		$(element).typeahead("destroy");

		var typeaheadOpts = {
			source: suggestions.ttAdapter(),
			displayKey: displayedProperty || function (item) {
				return item;
			}
		};

		if (templateName) {
			typeaheadOpts.templates = {
				suggestion: function (item) {
					var temp = document.createElement("div");
					var model = mapping ? mapping(item) : item;
					ko.renderTemplate(templateName, model, null, temp, "replaceChildren");

					return temp;
				}
			};
		}

		$(element)
			.typeahead($.extend({
				hint: true,
				highlight: true,
			}, user_typeahead_options), typeaheadOpts)
		.on("typeahead:selected typeahead:autocompleted", function (e, suggestion) {
			if (onSelect) {
				onSelect(value, suggestion, e)
			}else if (value && ko.isObservable(value)) {
				value(suggestion);
			}
		});
	}
};
