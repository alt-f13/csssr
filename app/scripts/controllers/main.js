'use strict';

/**
 * @ngdoc function
 * @name csssrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the csssrApp
 */
angular.module('csssrApp')
  .controller('MainCtrl', function ($scope, $routeParams, $location, github) {
    var gh=github;
    $scope.page=gh.page;
    $scope.pageSizes = [5,15,25,40, 70, 100];
    $scope.user=$routeParams.user;

    $scope.inputChanged = function(str) {
      console.log(str);
      $scope.valInput = str;
    };
    $scope.selectObject = function(selected) {
      $scope.valInput = selected.description.full_name;
      $scope.search();
    }
    $scope.localSearch = function (str) {
          var matches = [];
          $scope.page.repos.forEach(function(rep) {
            if (rep.full_name.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) {
              matches.push(rep);
            }
          });
          return matches;
    };
    $scope.search = function(str) {
      $location.path("/"+$scope.valInput+"/");
    };
    $scope.closeAlert = function(id) {
      var index = $scope.page.errors.splice(id, 1);
    }
    //$scope.$broadcast('angucomplete-alt:changeInput', $location.path());
    if (angular.isDefined($scope.user)) gh.getRepos($scope.user);





  });
