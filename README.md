App.js
======

Javascript Module Pattern to organize your execution flow using Namespaces.

The Problem
-----------

It's a commonplace to be working on a project (even the small ones) and have your Javascript code becoming a mess, with callbacks after callbacks trying to controll the execution flow, not mentioning the difficulty to debug it, when everything belongs to the global scope.
And/Or, you might be working with a framework (such as rails) that compress all your javascript code into a single file, and you don't want that piece of code, that belongs to an especific page, to be executed everywhere.

Using App.js
------------

Create modules using App namespace, and run them as you need.

Defining a new module ( init() method gets executed when you run the module ).

```javascript
App.namespace('Clients.Index', (function () {

  // private
  function init() {
    $('h3 i').html('App.Clients.Index')
  }

  return {
    init: init
  }

})());
```
