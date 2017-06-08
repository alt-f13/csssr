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
    $scope.getIssuse = function(repo) {
      console.log(repo);
      $http.get('https://api.github.com/repos/'+repo+'/issues')
        .then(function(data) {
          $scope.data=data.data;
          console.log($scope.data);
        })
        .catch(function(data) {
          console.error(data);
        })
    }

  });
