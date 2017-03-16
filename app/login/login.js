'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.errorMsg = null;
        $scope.login = function () {
            console.log("login user");
            Backendless.UserService.login($scope.user.email, $scope.user.password, $scope.user.remember, new Backendless.Async( userLoggedIn, loginError ));
        };

        function userLoggedIn(user) {
            console.log("user has logged in");
            $window.location.href = "/#!/home"
        }

        function loginError(err) {
            console.log("error message - " + err.message);
            console.log("error code - " + err.statusCode);
            handleErrorMsg("Received error from server: " + err.message);
            $scope.$apply();
        }

        function handleErrorMsg(msg) {
            $scope.errorMsg = msg;
        }


        $scope.cancel = function() {
            $window.location.href = "/#!/home";
        }

    }]);