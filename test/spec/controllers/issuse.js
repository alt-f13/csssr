'use strict';

describe('Controller: IssuseCtrl', function () {

  // load the controller's module
  beforeEach(module('csssrApp'));

  var IssuseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IssuseCtrl = $controller('IssuseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //var issuse = $controller('IssuseCtrl');
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
