'use strict';

describe('Filter: gh', function () {

  // load the filter's module
  beforeEach(module('csssrApp'));

  // initialize a new instance of the filter before each test
  var gh;
  beforeEach(inject(function ($filter) {
    gh = $filter('gh');
  }));

  it('should return the input prefixed with "gh filter:"', function () {
    var text = 'angularjs';
    expect(gh(text)).toBe('gh filter: ' + text);
  });

});
