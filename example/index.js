var $ = require("jquery");
var ko = require("knockout");
require("../knockout.typeahead");

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