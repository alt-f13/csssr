'use strict';

/**
 * @ngdoc directive
 * @name csssrApp.directive:issue
 * @description
 * # issue
 */
angular.module('csssrApp')
  .directive('issue', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the issue directive');
      }
    };
  });
