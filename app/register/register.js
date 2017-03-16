'use strict';

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'registerCtrl'
        });
    }])

    .controller('registerCtrl',  ['$scope' , '$window' , function($scope, $window) {

        $scope.errorMsg = null;
        $scope.register = function () {
            console.log("registering user");
            var user = new Backendless.User();
            user.name = $scope.user.name;
            user.email = $scope.user.email;
            user.password = $scope.user.password;
            if ($scope.user.pswRepeat != $scope.user.password) {
                handleErrorMsg("Error: Password mismatch");
            } else {
                Backendless.UserService.register(user).then(userRegistered).catch(registrationError);
            }
        };


        function userRegistered(user) {
            console.log("user has registered");
            $window.location.href = "/#!/login"
        }

        function registrationError(err) {
            console.log("error message - " + err.message);
            console.log("error code - " + err.statusCode);
            handleErrorMsg("Received error from server: " + err.message);
            $scope.$apply();
        }

        function handleErrorMsg(msg) {
            $scope.errorMsg = msg;
        }




    }]);

