angular
    .module('hrmsApp')
    .controller('Positioncontroller', [
        '$scope',
        '$rootScope',
        
        function ($scope,$rootScope) {
                $scope.test = [
                    {
                        "id" : 1,
                        "event" : "Human Resource Manager",
                        
                    },
                    {
                        "id" : 2,
                        "event" : "Developer",
                        
                    },
                    {
                        "id" : 3,
                        "event" : "Trainee Developer",
                        
                    },
                    {
                        "id" : 4,
                        "event" : "Testing",
                        
                    },
                    {
                        "id" : 5,
                        "event" : "Programmer Analyst",
                        
                    },
                    {
                        "id" : 6,
                        "event" : "Developer",
                        
                    }
            ]

                    console.log($scope.newTask)

            

        }
    ]);


