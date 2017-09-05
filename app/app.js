'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.register',
    'myApp.login',
    'myApp.forgot',
    'myApp.location',
    'myApp.home',
    'myApp.version'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

var APP_ID = '6A8A00EF-93B2-745A-FFDD-06ABA389D200';
var API_KEY = '26B3F117-89F4-DBA7-FF2C-6BEA2C35DC00';

Backendless.initApp(APP_ID, API_KEY);

window.fbAsyncInit = function () {
    FB.init({
        appId: '1593715633979542',
        xfbml: true,
        version: 'v2.8'
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



