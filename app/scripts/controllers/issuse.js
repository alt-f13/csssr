'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:IssuseCtrl
 * @description
 * # IssuseCtrl
 * Controller of the csssrApp
 */
angular.module('csssrApp')
  .controller('IssuseCtrl', function ($scope, $routeParams, github) {
    var gh = github;
    $scope.page=gh.page;
    gh.getIssue($routeParams.user, $routeParams.repo, $routeParams.id);


  });
