// App.js
// Author: Rodolfo Goncalves (http://github.com/rodolfoag)
// A simple implementation of Javascript Module Pattern;
// Allows to easily register and execute modules using nested namespaces;
// Inspired by @shiota's speech on RubyConfBrazil 2013;
var App = (function (){
  "use strict";
  
  var app = {}
    , scheduleEntries = [];

  // From Mozilla MDN  
  // isArray - checks browse compatibility: =( ie7, ie8...
  if( ! Array.isArray ) {
    Array.isArray = function (vArg) {
      return Object.prototype.toString.call(vArg) === "[object Array]";
    };
  }

  // ns - creates the module
  function ns(scope, namespace, object) {
    var parts = namespace.split('.');
    
    for ( var i = 0; i < parts.length; i++ ) {
      if ( i === parts.length - 1 ) {
        scope[parts[i]] = object;
      } else {
        // create property if it doesn't exist
        if ( typeof scope[parts[i]] === 'undefined' ) {
          scope[parts[i]] = {};
        }
      }
      
      scope = scope[parts[i]];
    }
    
    return scope;
  };
  
  // Register namespaces under App
  // Egg: App.namespace('Clients.Show')
  //      or using an Array
  //      App.namespace(['Clients.New', 'Clients.Create']) 
  app.namespace = function (namespace, object) {
    var module;
    
    if (Array.isArray(namespace)) {
      module = [];
      for ( var i = 0; i < namespace.length; i++ ) {
        module.push( ns(this, namespace[i], object) );
      }
    } else {
      module = ns(this, namespace, object);
    }
    
    return module;
  };
  
  // Runs a module registered through namespace
  // Executes init() on the desired module
  app.run = function (namespace, args) {
    var parts = namespace.split('.')
      , scope = this;
    
    for (var i = 0; i < parts.length; i++) {
      if (typeof scope[parts[i]] === 'undefined') return;
      scope = scope[parts[i]];
    }

    if (scope && typeof scope['init'] === 'function') {
      scope.init(args);
    }
  
    return scope;
  };
  
  // Dispatch an module by a router name (inspired by @eshiota - RubyConf 2013)
  // route format: controller#action
  // transleted to: Controller.Action
  app.dispatchRoute = function (route) {
    var parts = route.split('#')
      , namespace = '';
    
    for (var i = 0; i < parts.length; i++) {
      var parts_aux = parts[i].split('_')
        , module = '';

      for (var j = 0; j < parts_aux.length; j++) {
        parts_aux[j] = parts_aux[j].charAt(0).toUpperCase() + parts_aux[j].slice(1);
        module += parts_aux[j]
      }
      
      namespace += (namespace === '') ? module : '.' + module
    }
    
    return this.run(namespace);
  };
  
  // Adds a module namespace to a schedule list to further execution
  app.schedule = function (namespace) {
    scheduleEntries.push(namespace);
  };
  
  // Runs a schedule and clean the schedule entries array
  app.runSchedule = function () {
    scheduleEntries.forEach(function (val) {
      app.run(val);
    });
    
    // empty the entries array
    scheduleEntries.length = 0;
  };
  
  return app;
})();
