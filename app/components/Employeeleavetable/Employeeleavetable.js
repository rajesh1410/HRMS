angular
    .module('hrmsApp')
    .controller('EmployeeleavetableContrl',

        function ($scope,$timeout,$http,$state,$rootScope) {

//LocalStorage

            var data = localStorage.getItem('response.data');
            var data1 = JSON.parse(data);
            console.log(data1,"EmployeeLeave");

            

 //Get Employee Leave Application

            var EmpId = data1[0].EmployeeId;
            // console.log(EmpId,"Employee Id deatil");


            $scope.getallData1 = function(EmpId){
                console.log(EmpId,"tamil");
                var postdata = {'empid':EmpId};
            $http({
                        method: 'post',
                        url: $rootScope.$siteUrl+'leaveData',
                        data:postdata
                    }).then(function(response){
                        $scope.LeaveTables = response.data[0];
                        $scope.LeaveTables1 = response.data[1];
                        // $scope.LeaveTables.push(response.data)
                        console.log(response.data,"Leavedatatable");
                    })
            }
            
            $scope.getallData1(EmpId);

            $scope.delete = function(id){
                if (id) {
                    UIkit.modal.confirm(
                      "Are you sure to delete?",
                      function(e) {
                        if (id) {
                          $http({
                            method: "DELETE",
                            url: $rootScope.$siteUrl + "delete_leave/" + id
                            // params: { id: id }
                          }).then(function(result) {
                            console.log(result, "Mohana");
                            UIkit.notify({
                              message: result.data,
                              status: "success",
                              timeout: 2000,
                              pos: "top-center"
                            });
                            $scope.getallData1(EmpId);
                          });
                        }
                      },
                      
                    );
                  }
            }
             










            // $scope.edit = function($event,index,user){
            //     $event.preventDefault();
            //     $scope.entity = $scope.LeaveTables[index];
            //     $scope.entity.index = index;
            //     $scope.entity.editable = true;
            // };

            
           

  


        }
    );