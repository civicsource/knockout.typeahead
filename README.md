#Knockout Typeahead Binding

> Simple knockout binding that wraps [Twitter typeahead.js](http://twitter.github.io/typeahead.js/)

##Install with [Bower](http://bower.io/)

```
bower install knockout-typeahead
```

Then add `knockout.typeahead.js` to your project. If you are using AMD, also be sure to alias in your requirejs config `typeahead` as `typeahead.bundle.js`:

```js
requirejs.config({
    paths: {
        'typehead': 'bower_components/typeahead.js/dist/typeahead.bundle'
    }
});
```

##How to Use

Include the script on your page (either via a normal script tag or via an AMD loader). Then bind it to an element:

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
* string `returnKey`: Property name on complex object suggestion data which will populate the `data-return-value` attribute of the bound element.
