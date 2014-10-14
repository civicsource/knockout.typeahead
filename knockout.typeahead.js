define(["knockout", "jquery", "typeahead",
"less!app/../less/typeahead"], function (ko, $) {
	ko.bindingHandlers.typeahead = {
		init: function (element, valueAccessor, allBindings) {
			// http://stackoverflow.com/a/19366003/1247130 get value to update properly when typeahead choice is selected.

			var url = ko.unwrap(valueAccessor());
			var auth = (allBindings.has('authToken'))?  {
				"Authorization": "Bearer " + ko.unwrap(allBindings().authToken)
			} : {};
			var remoteData = {
				url: url,
				ajax: {
					headers: auth
				}
			};

			var suggestions = new Bloodhound({
				datumTokenizer: function (token) {
					return Bloodhound.tokenizers.whitespace(token);
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: remoteData
			});
			suggestions.initialize();


			var templateName = ko.unwrap(allBindings().templateName);
			var returnedProperties = ko.unwrap(allBindings().returned);

			var update = function (selection) {
				if (allBindings.has('value')) {
					allBindings.value(selection);
				}
			};

			$(element)
				.typeahead({
					hint: true,
					highlight: true
				},
				{
					source: suggestions.ttAdapter(),
					display: function (item) {
						if (templateName) {
							var temp = document.createElement("div");
							ko.renderTemplate(templateName, item, null, temp, "replaceChildren");

							return temp.innerHTML;
						}

						else {
							return item;
						}
					}
				});

			//	.on('typeahead:selected', function (el, item) {
			//	updateValues(item);
			//}).on('typeahead:autocompleted', function (el, item) {
			//	updateValues(item);
		}
	};
});