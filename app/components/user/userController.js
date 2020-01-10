angular
    .module('hrmsApp')
    .controller('userCtrl', [
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
                        url: $rootScope.$siteUrl+'users',
                        // trainee:trainees
                    }).then(function(response){
                        $scope.users = response.data;
                        console.log($scope.users,"<Users></Users>")
                    })
            }
            $scope.getallData();

//POST DATA
            $scope.users = [];
            $scope.Users = function (postdata) {
                console.log(postdata,"postdata")
                   $(".http_preloader").show();
                $http({
                    method: 'post',
                    url:$rootScope.$siteUrl+'users',
                    data:postdata
                })

                .then(function success(response) {
                    
                    console.log(response,'response');

                    $scope.data={};
                
                    
                    
                    $scope.getallData(); 
                    $toast(response.data,'success');            
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
                  $http({
                        method: 'delete',
                        url: $rootScope.$siteUrl+'users/'+user.id,
                        // trainee:trainees
                    }).then(function(response){
                        $scope.user = response.data;
                        $toast('Delete User Data Successfully','success');
                        //console.log(response,"rajeshresponse"
                    })
                $event.preventDefault();
                UIkit.modal.confirm('Are you sure?', function(){
                    $scope.users.splice(index,1);
                });
            };
//SAVE DATA
            $scope.save = function($event,index,user){
                console.log(user,"save")
                $http({
                        method: 'patch',
                        url: $rootScope.$siteUrl+'users/'+user.id,
                        data:user
                    }).then(function(response){
                        $toast('User Data Update Successfully',"success")
                    })
                //$scope.getallData();
               $event.preventDefault();
                $scope.users[index].editable = false;

            }; 
//not used
            $scope.checkPassword = function(password, confirmpassword){
                console.log(password,confirmpassword,"keerthi")
                if(password != "" && confirmpassword != ""){
                    if(password == confirmpassword){
                        $scope.match = true;
                    }
                    if(password != confirmpassword){
                        $scope.notmatch = true;
                    }
                }

            }

// GET EMPOLYEE NAME 
            $scope.EmpName = function(){
                    $http({
                            method: 'get',
                            url: $rootScope.$siteUrl+'SelectEmp'
                            // http://127.0.0.1:8000/api/test

                        }).then(function(response){
                            console.log(response,"Newtesting");
                            $scope.EmpolyeeName= response.data;
              //               $scope.selectize_val_options.push($scope.EmpolyeeName);
              // console.log($scope.selectize_val_options,"s$scope.selectize_val_options");
                            $scope.selectize_val_options=$scope.EmpolyeeName;
                            console.log(response.data,"EmpolyeeName");
                        })
                }
                $scope.EmpName();

// SELECTIZE

            $scope.selectize_val_options = [];
             
            
            $scope.selectize_val_config = {
                maxItems: 1,
                 valueField: 'employee_id',
                 labelField: 'full_name',
                create: false,
                placeholder: 'Choose Empolyee...'
            
            };


             $scope.selectize_val_options1 = [
                { value: 'Manger', label: 'Manger' },
                { value: 'HR', label: 'HR' },
                { value: 'Empolyee', label: 'Empolyee' }
            ];

            $scope.selectize_val_config1 = {
                maxItems: 1,
                valueField: 'value',
                labelField: 'label',
                create: false,
                placeholder: 'Select Position..'
            };



        }
        


    ]);

