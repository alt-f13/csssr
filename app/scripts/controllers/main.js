'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the csssrApp
 */
angular.module('csssrApp')
  .controller('MainCtrl', function ($scope, $http, $location, $rootScope) {
    //$scope.searchData="JrCs/docker-letsencrypt-nginx-proxy-companion";
    $scope.pagination = [5,15,25,40, 70, 100];
    //$scope.searchData="alt-f13/csssr";
    //$scope.searchData="Microsoft/vscode-docs";
    $scope.repos=[];
    $rootScope.data=[];
    $rootScope.per_page=5;
    $rootScope.page=1;
    $scope.setPagination = function(size) {
      $rootScope.per_page=size;
      $rootScope.page=1;
      console.log("page size:", size);
      $scope.getIssuse($scope.searchData);
    };
    $scope.setPage = function(page) {
      $rootScope.page=page;
      console.log("page:", page);
      $scope.getIssuse($scope.searchData);
    };
    $scope.getIssuse = function(repo) {
      console.log(repo);
      $rootScope.data=[];
      if ($rootScope.per_page === undefined) $rootScope.per_page=5;
      if (!$rootScope.page) $rootScope.page=1;
      $http.get('https://api.github.com/repos/'+repo+'/issues?per_page='+$rootScope.per_page+'&page='+$rootScope.page)
        .then(function(data) {
          console.log(data);
          $rootScope.data=data.data;
          console.log($rootScope.data, $location.path());
          if ($location.path() !== '/') $location.path("/");
        })
        .catch(function(data) {
          console.error(data);
        })
    };
    $scope.selectObject = function(selected) {
      console.log(selected.originalObject.full_name);
      $scope.searchData=selected.originalObject.full_name;
      $scope.getIssuse(selected.originalObject.full_name);
    }
    $scope.inputChanged = function(str) {
      $scope.searchData = str;
    }
    $scope.searchRepos = function(typed, timeoutPromise) {
      return $http.get('https://api.github.com/users/'+typed+'/repos')
    };
  });
