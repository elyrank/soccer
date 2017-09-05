'use strict';

angular.module('myApp.forgot', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/forgot', {
            templateUrl: 'forgot/forgot.html',
            controller: 'forgotCtrl'
        });
    }])

    .controller('forgotCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.forgotMsg = null;
        $scope.errorMsg = null;

        $scope.forgotPassword = function() {
			console.log("forgot password for email: " + $scope.forgotEmail);
			Backendless.UserService.restorePassword($scope.forgotEmail)
		.then( function() {
			console.log("forgot success");
			$scope.forgotMsg = "You will soon get an email with a password recovery link";
			$scope.$apply();
		})
		.catch(handleErrorMsg);
		};


		function handleErrorMsg(msg) {
			if (msg.code === 5050) {
				console.log("retry forgot");
				$scope.forgotPassword();
			} else {
				console.log(msg);
				$scope.errorMsg = msg ? msg.message : null;
				$scope.$apply();
			}
		}

        $scope.cancel = function() {
            $window.location.href = "/#!/home";
        };

    }]);