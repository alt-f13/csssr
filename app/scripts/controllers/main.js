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
    $scope.goTo = function() {
      $location.path("/"+$scope.valInput);
    };
    $scope.closeAlert = function(id) {
      var index = $scope.page.errors.splice(id, 1);
    };
    $scope.search = function(str) {
      if ($location.path() !== "/") {
        return gh.search(str);
      }else{
        return false;
      }
    };
    function init() {
      var path=$location.path().split('/');
      $scope.valInput = path[1];
      if (path[2]) $scope.valInput += "/"+path[2];
    };




  });
