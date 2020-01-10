angular
    .module('hrmsApp')
    .controller('JobdetailsCtrl', [
        '$scope',
        '$timeout',
        '$http',
        '$toast',
        '$rootScope',
        function ($scope,$timeout,$http,$toast,$rootScope) {
        var $formValidate = $('#form_validation');

//GET DATA

            $scope.getallData = function(){
                $http({
                        method: 'get',
                        url: $rootScope.$siteUrl+'Job',
                        // trainee:trainees
                    }).then(function(response){
                        $scope.users = response.data;
                        console.log($scope.users,"get")
                    })
            }
            $scope.getallData();

//POST DATA
            $scope.users = [];
            $scope.JobDeatils = function (postdata) {
                console.log(postdata,"postdata")
                   $(".http_preloader").show();
                $http({
                    method: 'post',
                    url:$rootScope.$siteUrl+'Job',
                    data:postdata
                })

                .then(function success(response) {
                    
                    console.log(response,'response');

                    $scope.data={};
                
                    
                    
                    $scope.getallData(); 
                    $toast("JobDeatils Added Successfully",'success');            
                   $(".http_preloader").hide();                        
                })


            }


            
//EDIT DATA
            $scope.edit = function($event,index,user){
                console.log(user,"edit")
                $event.preventDefault();
                $scope.entity = $scope.users[index];
                $scope.entity.index = index;
                $scope.entity.editable = true;
            };

//DELETE DATA

            $scope.delete = function($event,index,user){
                console.log(user,"delete")
                $event.preventDefault();
                UIkit.modal.confirm('Are you sure?', function(){
                    $scope.users.splice(index,1);
                  $http({
                        method: 'delete',
                        url: $rootScope.$siteUrl+'Job/'+user.id,
                        // trainee:trainees
                    }).then(function(response){
                        $scope.user = response.data;
                        $toast("JobDeatils Delected Successfully",'success')
                        //console.log(response,"rajeshresponse"
                    })
                });
            };
//SAVE DATA
            $scope.save = function($event,index,user){
                console.log(user,"save")
                $http({
                        method: 'patch',
                        url: $rootScope.$siteUrl+'Job/'+user.id,
                        data:user
                    }).then(function(response){

                    $toast("JobDeatils Update Successfully","success");               
                    $scope.getallData();
                    })
               $event.preventDefault();
                $scope.users[index].editable = false;

            }; 


        }
        


    ]);

