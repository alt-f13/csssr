'use strict';

/**
 * @ngdoc filter
 * @name csssrApp.filter:range
 * @function
 * @description
 * # range
 * Filter in the csssrApp.
 */
angular.module('csssrApp')
  .filter('range', function () {
    return function(val, range) {
      range = parseInt(range);
      for (var i=0; i<range; i++)
        val.push(i);
      return val;
    };
  });
