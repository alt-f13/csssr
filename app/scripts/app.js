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
    'hc.marked'
  ])
  .config(function ($routeProvider,cfpLoadingBarProvider) {
    $routeProvider
      .when('/:user?', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/:user/:repo/issuse/:id', {
        templateUrl: 'views/issuse.html',
        controller: 'IssuseCtrl',
        controllerAs: 'issuse'
      })
      .when('/:user/:repo/:page/:perPage', {
        templateUrl: 'views/repo.html',
        controller: 'RepoCtrl',
        controllerAs: 'repo'
      })
      .when('/:user/:repo', {
        redirectTo: '/:user/:repo/1/5'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
