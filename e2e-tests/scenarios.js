'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /register when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/register");
  });


  describe('register', function() {

    beforeEach(function() {
      browser.get('index.html#!/register');
    });


    it('should render register when user navigates to /register', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Please fill your details/);
    });

  });


  describe('login', function() {

    beforeEach(function() {
      browser.get('index.html#!/login');
    });


    it('should render login when user navigates to /login', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
