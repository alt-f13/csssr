'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the csssrApp
 */
angular.module('csssrApp')
  .controller('UserCtrl', function ($scope, $routeParams, $location, github) {
    var gh=github;
    $scope.page=gh.page;
    gh.getRepos($routeParams.user);
    console.log("user", $routeParams.user);
  });
