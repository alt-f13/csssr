'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:IssuseCtrl
 * @description
 * # IssuseCtrl
 * Controller of the csssrApp
 */
angular.module('csssrApp')
  .controller('IssuseCtrl', function ($scope, $http, $routeParams, $rootScope, github) {
    var gh = github;
    $scope.page=gh.page;
    gh.getIssue($routeParams.user, $routeParams.repo, $routeParams.id)
      .then(function(data) {
        console.log($scope.page);

      })


  });
