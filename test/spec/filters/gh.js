'use strict';

describe('Filter: gh', function () {

  // load the filter's module
  beforeEach(module('csssrApp'));

  // initialize a new instance of the filter before each test
  var gh;
  beforeEach(inject(function ($filter) {
    gh = $filter('gh');
  }));

  it('should remove https://api.github.com/repos/ from urls', function () {
    var url = 'https://api.github.com/repos';
    var text = 'alt-f13/';
    expect(gh(url +"/"+text)).toBe(text);
  });

});
