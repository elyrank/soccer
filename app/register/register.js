'use strict';

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'registerCtrl'
        });
    }])

    .controller('registerCtrl',  ['$scope' , '$window' , function($scope, $window) {

        var facebookFieldsMapping = {
            "email": "email",
            "name": "name"
        };
        var container = {
            "AppId": "1593715633979542",
            "AppSecret": "8ce4aef5b29bac2349d0e171674b9180"
        };

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

        $scope.cancel = function() {
            $window.location.href = "/#!/home";
        };

        $scope.loginWithFb = function() {

            var permissions = ["email", "public_profile"];


            function fbSuccess(data) {
                console.log("fb success");
                console.log(data);
                $window.location.href = "/#!/home";
                $window.location.reload();
            }

            function fbError(err) {
                console.log("fb error");
                console.log(err);

            }

            Backendless.UserService.loginWithFacebook(facebookFieldsMapping, permissions, new Backendless.Async(fbSuccess, fbError), container);

        };


    }]);

