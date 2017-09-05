#Knockout Typeahead Binding

> Simple knockout binding which wraps [Twitter typeahead.js](http://twitter.github.io/typeahead.js/)

##Installation

```
npm install knockout.typeahead
```


##Usage

Include in your bundle with browserify or webpack. You will need to have a loader configured for less files in order to get styling from the included stylesheet, or you can bring your own.

```html
<input data-bind="value: myValue, typeahead: autocompleteMyValue" />
```

with a view model that looks like this:

```js
function ViewModel() {
	this.myValue = ko.observable();
	this.autocompleteMyValue = '/my/server/url?value=%QUERY';
}
```

If the remote endpoint you are querying is returning a complex object instead of an array of suggestions, you can pass a `remoteFilter` parameter to the binding, a function on your view model which returns the portion of the response object containing the array of suggestions.

If you are returning complex objects as suggestions, pass a `templateName` into the binding to use a custom template.

```html
<input data-bind="value: myValue, typeahead: autocompleteMyValue, remoteFilter: pluckResults, templateName: 'my-suggestion-template'" />
```

Clone the repository then `npm i && npm run start` to build the example.

##Additional Binding Options
* function `mappingFunction`: Function on your model which will map the suggestion data returned from your queries (e.g. so you can use computed observables and extenders in your template)
* string `displayKey`: Property name on complex object suggestion data which will be used to populate the hint/value of the typeahead input.
* string `onSelectFunction`: a function which will be triggered when selecting an item. The function will be sent three parameters: the knockoutobservable for the binding, the selected suggestion, and the event.
* object `typeaheadOpts`: additional options for typeahead. see [jquery_typeahead](https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#options )
* boolean `localSuggestions`: if you are using local data, set it to true. Your data can be an array of strings, or an object.
