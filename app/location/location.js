'use strict';

angular.module('myApp.location', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/location', {
            templateUrl: 'location/location.html',
            controller: 'locationCtrl'
        });
    }])

    .controller('locationCtrl', ['$scope', '$window', function ($scope, $window) {

    }]);