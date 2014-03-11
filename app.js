// app.js
// Author: Rodolfo Goncalves (http://github.com/rodolfoag)
var app = (function (root) {
  "use strict";

  // Module Exported
  var module = {};

  // Private
  function set_ns (root_scope, namespace, object) {
    var parts = namespace.split('.'),
        scope = root_scope,
        name;

    for ( var i = 0, n = parts.length; i < n; i++ ) {
      name = parts[i];

      if ( i === n - 1 ) {
        if (get_ns(scope, name)) {
          throw 'Namespace ' + namespace + ' already defined.';
        }
        scope[name] = object;
      } else {
        // create property if it doesn't exist
        if ( typeof scope[name] === 'undefined' ) {
          scope[name] = {};
        } else if ( typeof scope[name] !== 'object' ) {
          throw 'Namespace ' + namespace.split('.', i + 1).join('.') + ' is not an object.';
        }
      }

      scope = scope[name];
    }

    return scope;
  }

  function get_ns (root_scope, namespace) {
    var parts = namespace.split('.'),
        scope = root_scope,
        name;

    for (var i = 0, n = parts.length; i < n; i++) {
      name = parts[i];

      if (typeof scope[name] === 'undefined') {
        return;
      }

      scope = scope[name];
    }

    return scope;
  }

  // Public
  module.namespace = function (namespace, object) {
    return set_ns(this, namespace, object);
  };

  module.route = function (namespace, fn) {
    if (typeof fn !== 'function') {
      throw 'Object ' + fn + 'is not a function.';
    }

    return set_ns(this, 'routes.' + namespace, fn);
  };

  module.dispatch_route = function (namespace, action) {
    var fn = get_ns(this, 'routes.' + namespace),
        route_obj,
        action_fn;

    // Don't do anything if the route isn't defined and don't allow other
    // than a function
    if (typeof fn === 'undefined') {
      return;
    } else if (typeof fn !== 'function') {
      throw 'Namespace ' + namespace + ' is not a function.';
    }

    // Obs.: a route should always return an object, containing properties named
    // after actions, with a function as its value

    route_obj = fn();

    if (typeof route_obj !== 'object') {
      throw 'Route ' + namespace + ' is not a valid router. Should return an object.';
    } else {
      action_fn = route_obj[action];

      if (typeof action_fn !== 'undefined' && typeof action_fn !== 'function') {
        throw 'Action ' + action + ' of router ' + namespace + ' is not a function.';
      } else if ( typeof action_fn === 'function' ) {
        action_fn();
      }
    }
  };

  return module;
})(this);
