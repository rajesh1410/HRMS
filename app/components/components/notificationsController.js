angular
    .module('hrmsApp')
    .controller('notificationsCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$timeout',
        function ($scope,$rootScope,$state,$timeout) {

            $scope.notificationCallback = function() {
                return alert('Notify closed!');
            };

            $scope.message_in_controller = "<a href='#' class='notify-action'>Undo</a> Message deleted";

            $timeout(function() {
                angular.element("#show_on_load").trigger("click");
            }, 200);

        }
    ]);