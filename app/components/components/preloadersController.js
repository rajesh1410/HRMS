angular
    .module('hrmsApp')
    .controller('preloadersCtrl', [
        '$scope',
        '$timeout',
        'preloaders',
        function ($scope,$timeout,preloaders) {
            $scope.preloaders = preloaders;
            $('.preloader_example').click(function() {
                $timeout(function() {
                    preloaders.preloader_hide();
                },3000)
            })
        }
    ]);