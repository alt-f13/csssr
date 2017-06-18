'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:RepoCtrl
 * @description
 * # RepoCtrl
 /:user/:repo
 */
angular.module('csssrApp')
  .controller('RepoCtrl', function ($scope, $routeParams, $location, github) {
    var gh=github;
    $scope.page=gh.page;

    $scope.user=$routeParams.user;
    $scope.rep=$routeParams.repo;
    $scope.currentPage=$routeParams.page;
    $scope.perPage = $routeParams.perPage;
    //$scope.currentPage = angular.isDefined($routeParams.page) ? $routeParams.page | 1;
    //console.log($location.path(), "repo", $scope.user, $scope.rep);

    gh.getIssues($scope.user, $scope.rep, $scope.currentPage, $scope.perPage);


  });
