angular
    .module('hrmsApp')
    .controller('employee_viewCtrl', [
        '$scope',
        '$rootScope',
        'utils',
        '$http',
        '$stateParams',
        function ($scope,$rootScope,utils,$http,$stateParams) {

        var id = $stateParams.Id;
        $scope.img_path = 'upload/';
         var data = localStorage.getItem('response.data');
            var data1 = JSON.parse(data);
            var Id = data1[0].id; 

            $scope.edit = function(Id) {
                $(".http_preloader").show(); 
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl+'status_edit/' + Id,
                    data:id
                    // headers: {
                    //     'Authorization': 'Bearer ' + $scope.Token
                    // }
                }).then(function mySuccess(response) { 
                    $scope.view = response.data;
                    angular.forEach(response, function(value, key) {
                        if (value.MeetingDate) {
                            value.MeetingDate = MonthLetterFilter(value.MeetingDate);
                        }
                    });
                    angular.forEach($scope.view, function(value,key){
                        if(value != 'null'){
                            $scope.view.key = value;
                        }else{
                            delete $scope.view[key];
                        }
                    })
                    console.log($scope.view,'view')
                    $(".http_preloader").hide();   
                });
            }


        if (id) {
                $scope.edit(id);
            }else if (Id) {
                $scope.edit(Id);
            }      





        }
    ]);
