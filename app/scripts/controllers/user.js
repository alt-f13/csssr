'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the csssrApp
 */
angular.module('csssrApp')
  .controller('UserCtrl', function ($scope, $routeParams, github) {
    var gh=github;
    $scope.user=$routeParams.user;
    if (angular.isDefined($scope.user)) gh.getRepos($scope.user, 1);
  });
