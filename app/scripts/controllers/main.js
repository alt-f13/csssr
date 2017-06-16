'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the csssrApp
 */
angular.module('csssrApp')
  .controller('MainCtrl', function ($scope, $http, $location, $rootScope, github) {
    var gh=github;
    $scope.page=gh.page;
    gh.getIssues('microsoft','ace')
    //   .then(function(data) {
    //     console.log(data);
    //     console.log("scope", gh,$scope.page.data);
    //   })
    $scope.pagination = [5,15,25,40, 70, 100];
    $scope.setPagination = function(size) {
      $rootScope.per_page=size;
      $rootScope.page=1;
      $scope.getIssuse($scope.searchData);
    };
    $scope.setPage = function(page) {
      $rootScope.page=page;
      $scope.getIssuse($scope.searchData);
    };
    $scope.getIssuse = function(repo) {
      $http.get('https://api.github.com/repos/'+repo+'/issues?per_page='+$rootScope.per_page+'&page='+$rootScope.page)
        .then(function(data) {
          $rootScope.data=data.data;
          if ($location.path() !== '/') $location.path("/");
        })
        .catch(function(data) {
          console.error(data);
        })
    };
    $scope.selectObject = function(selected) {
      $scope.searchData=selected.originalObject.full_name;
      $scope.getIssuse(selected.originalObject.full_name);
    }
    $scope.inputChanged = function(str) {
      $scope.searchData = str;
    }
    $scope.searchRepos = function(typed, timeoutPromise) {
      var _typed = typed.match(/^([a-zA-Z\d_-]*)\/?.*$/);
      return $http.get('https://api.github.com/users/'+_typed[1]+'/repos')
    };
  });
