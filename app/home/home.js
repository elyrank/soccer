'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });
    }])

    .controller('homeCtrl', ['$scope', function ($scope) {

        $scope.gameDate = getNextGameDate();
        isValid();
        $scope.currentUser = null;
        $scope.errorMsg = null;
        getAllUsers();

        function setUser(user) {
            $scope.currentUser = user;
            console.log(user);
            $scope.$apply();
        }

        function isValidResponse(success) {
            if (success) {
                console.log("success: " + success);
                Backendless.UserService.getCurrentUser().then(setUser).catch(error);
            } else {
                $scope.errorMsg = "Please login";
                $scope.$apply();
            }

        }

        function error(err) {
            console.log("error: " + err.message);
            $scope.errorMsg = err.message;
            $scope.$apply();
        }

        function validLoginError(data) {
            console.log("error: " + data);
            $scope.errorMsg = "Please login";
            $scope.$apply();
        }

        function isValid() {
            Backendless.UserService.isValidLogin().then(isValidResponse).catch(validLoginError);
        }


        // get objectId of the logged-in user:
        //var userObjectId = Backendless.LocalCache.get("current-user-id");

        // get user-token of the logged-in user:
        //var userToken = Backendless.LocalCache.get("user-token");


        function getUsersSuccess(users) {
            users.data.sort(function (a, b) {
                if (a.state < b.state) return 1;
                if (a.state > b.state) return -1;
                if (!a.state) return 1;
                if (!b.state) return -1;
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            });
            $scope.users = users.data;

            $scope.playersYes = users.data.filter(function (usr) {
                return usr.state == 'Yes'
            }).length;
            $scope.playersNo = users.data.filter(function (usr) {
                return usr.state == 'No'
            }).length;
            $scope.playersMaybe = users.data.filter(function (usr) {
                return usr.state == 'Maybe'
            }).length;
            $scope.gameState = $scope.playersYes >= 8;
            $scope.$apply();
        }


        function getAllUsers() {
            var query = new Backendless.DataQuery();
            query.options = {
                pageSize: 100
            };
            Backendless.Persistence.of(Backendless.User).find(query, new Backendless.Async(getUsersSuccess, error));
        }

        $scope.playing = function (state) {
            console.log("playing : " + state);
            $scope.currentUser.state = state;
            function updateSuccess(user) {
                console.log("update success: " + user);
                getAllUsers();
            }
            Backendless.UserService.update($scope.currentUser, new Backendless.Async(updateSuccess, error));
        };

        function userLoggedOut() {

        }

        function logoutUser() {
            Backendless.UserService.logout(new Backendless.Async(userLoggedOut, error));
        }

    }]);

/**
 * get next monday at 18:00
 * @returns {Date}
 */
function getNextGameDate() {
    var d = new Date();
    d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
    d.setHours(18);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

