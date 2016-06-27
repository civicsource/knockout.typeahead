var $ = require("jquery");
var ko = require("knockout");
require("../knockout.typeahead");
require("knockout-template?name=example-suggestion!html?-minimize!./suggestion.html");

var viewModel = {
	myValue: ko.observable(),
	autocompleteMyValue: "http://www.omdbapi.com/?s=%QUERY",
	remoteFilterMyAutocomplete: function(response) {
		return response.Search;
	}
};

$(function() {
	ko.applyBindings(viewModel);
});