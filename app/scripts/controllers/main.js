'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the csssrApp
 */
angular.module('csssrApp')
  .controller('MainCtrl', function ($scope, $http) {
    //$scope.searchData="JrCs/docker-letsencrypt-nginx-proxy-companion";
    $scope.pagination = [5,15,25,40, 70, 100];
    $scope.searchData="alt-f13/csssr";
    $scope.searchData="Microsoft/vscode-docs";
    //$scope.per_page=25;
    //$scope.page=1;
    $scope.setPagination = function(size) {
      $scope.per_page=size;
      $scope.page=1;
      console.log("page size:", size);
      $scope.getIssuse($scope.searchData);
    };
    $scope.setPage = function(page) {
      $scope.page=page;
      console.log("page:", page);
      $scope.getIssuse($scope.searchData);
    };
    $scope.getIssuse = function(repo) {
      console.log(repo);
      $scope.data=[];
      if (!$scope.per_page) $scope.per_page=5;
      if (!$scope.page) $scope.page=1;
      $http.get('https://api.github.com/repos/'+repo+'/issues?per_page='+$scope.per_page+'&page='+$scope.page)
        .then(function(data) {
          console.log(data);
          $scope.data=data.data;
          console.log($scope.data);
        })
        .catch(function(data) {
          console.error(data);
        })
    };

  });
