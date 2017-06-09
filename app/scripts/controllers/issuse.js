'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:IssuseCtrl
 * @description
 * # IssuseCtrl
 * Controller of the csssrApp
 */
angular.module('csssrApp')
  .controller('IssuseCtrl', function ($scope, $http, $routeParams) {
    console.log($routeParams);
    $scope.getIssuse = function() {
      $http.get('https://api.github.com/repos/'+$routeParams.username+'/'+$routeParams.repo+'/issues/'+$routeParams.id)
        .then(function(data) {
          console.log(data);
          $scope.data=data.data;
          console.log($scope.data);
        })
        .catch(function(data) {
          console.error(data);
        })
    }
    $scope.getIssuse();
  });
