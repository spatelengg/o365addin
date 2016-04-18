var app = (function(){  // jshint ignore:line
  'use strict';

  var self = {};

  // Common initialization function (to be called from each page)
  self.initialize = function(){
    jQuery('body').append();    
  };

  return self;
})();
