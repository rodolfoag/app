app.js
======

Namespacing and single point entry for bundled javascript.

## Namespace

Use **app.namespace** to register a value under a namespace:

```javascript
app.namespace('components.foo', function () {
  return 'bar';
});

var bar = app.components.foo(); // bar
```

## Creating a new route

A router must be a function returning an object, with functions as its properties values:

```javascript
app.route('fo#bar', function () {
  return {
    show: function () {
      console.log('fo#bar show dispatched');
    }
  };
});
```

In order to execute a router function, use **app.dispatch_route(route_name, action_name)**:

```javascript
// suppose you have a jQuery.ready() function to dispatch a route on page load,
// with the controller#action stored in the body document data attribute:
// ex: <body data-dispatcher='foo#bar'>
$(document).ready(function () {
  var dispatcher_array = $('body').data('dispatcher').split('#');
  app.dispatch_route(dispatcher_array[0], dispatcher_array[1]);
});
```
## Author

**Rodolfo Gonçalves**

+ [http://twitter.com/doxo85](http://twitter.com/doxo85)
+ [http://github.com/rodolfoag](http://github.com/rodolfoag)
