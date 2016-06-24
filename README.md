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

If you are returning complex objects for suggestions, pass a `templateName` into the binding to use a custom template.

```html
<input data-bind="value: myValue, typeahead: autocompleteMyValue, templateName: 'my-suggestion-template'" />
```

##Additional Binding Options
* function `mappingFunction`: Function on your model which will map the suggestion data returned from your queries (e.g. so you can use computed observables and extenders in your template)
* string `displayKey`: Property name on complex object suggestion data which will be used to populate the hint/value of the typeahead input.
