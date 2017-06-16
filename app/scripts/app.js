'use strict';

/**
 * @ngdoc overview
 * @name csssrApp
 * @description
 * # csssrApp
 *
 * Main module of the application.
 */
angular
  .module('csssrApp', [
    'ngRoute',
    'angular-loading-bar',
    'angucomplete-alt',
    'hc.marked',
    'ig.linkHeaderParser'
  ])
  .config(function ($routeProvider,cfpLoadingBarProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/issuse/:user/:repo/:id', {
        templateUrl: 'views/issuse.html',
        controller: 'IssuseCtrl',
        controllerAs: 'issuse'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
