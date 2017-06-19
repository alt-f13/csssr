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
    init();

    $scope.inputChanged = function(str) {
      $scope.valInput = str;
    };
    $scope.selectObject = function(selected) {
      $scope.valInput = selected.description.full_name;
      $scope.goTo();
    };
    $scope.localSearch = function (str) {
          var matches = [];
          $scope.page.repos.forEach(function(rep) {
            if (rep.full_name.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) matches.push(rep);
          });
          return matches;
    };
    $scope.goTo = function() {
      $location.path("/"+$scope.valInput);
    };
    $scope.closeAlert = function(id) {
      var index = $scope.page.errors.splice(id, 1);
    };
    function init() {
      var path=$location.path().split('/');
      if (!path[2]) {
        $scope.valInput = path[1];
      }else{
        $scope.valInput = path[1]+"/"+path[2];
      };
    };




  });
