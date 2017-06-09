'use strict';

/**
 * @ngdoc filter
 * @name csssrApp.filter:gh
 * @function
 * @description
 * # gh
 * Filter in the csssrApp.
 */
angular.module('csssrApp')
  .filter('gh', function () {
    return function (input) {
      return input.replace('https://api.github.com/repos/', '');
    };
  });
