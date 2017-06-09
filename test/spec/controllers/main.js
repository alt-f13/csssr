'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('csssrApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    //scope = {};
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('проверяем defaults', function () {
    //expect(MainCtrl.data.length).toBe(0);
    scope.getIssuse('microsoft/ace');
    expect(scope.data.length).toBe(scope.per_page);
  });
});
