'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.register',
    'myApp.login',
    'myApp.home',
    'myApp.version'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/register'});
    }]);


Backendless.initApp('7AA56302-6639-E35D-FF88-10129D67B600', 'AE12543B-3D3C-535F-FFC1-D54DE96DC700', 'v1');
Backendless.enablePromises();


