angular
    .module('hrmsApp')
    .controller('leaveCtrl',

        function ($scope,$timeout,$http,$state,$rootScope) {

            $scope.users = [];
            
            $scope.getallData1 = function(){
            $http({
                        method: 'get',
                        url: $rootScope.$siteUrl+'leaveinfo',
                        // trainee:trainees
                    }).then(function(response){
                        $scope.users1 = response.data;
                        // console.log(response,"get1")

                    })
            }
            
            

             $scope.save = function ($event,index,user) {
                // console.log(user,"save")
                var id = user.id;
                UIkit.modal.confirm(
                    "Are you sure to change status ?",
                    function(e) {
                    if (id) {
                        $http({
                        method: "patch",
                        url: $rootScope.$siteUrl + "leave/" + id,
                        data:user
                        }).then(function(result) {
                        UIkit.notify({
                            message: result.data,
                            status: "success",
                            timeout: 2000,
                            pos: "top-center"
                        });
                        $scope.getallData();
                        });
                    }
                    },
                    
                );
        }
             
            
             //

            

            $scope.getallData = function(){
            $http({
                        method: 'get',
                        url: $rootScope.$siteUrl+'leave',
                        // trainee:trainees
                    }).then(function(response){
                        $scope.users = response.data;
                        // console.log(response,"get")
                        $scope.getallData1();
                    })
            }
            
            $scope.getallData();

// get employee names
$scope.employee_name = function(){
    $http({
            method: 'get',
            url: $rootScope.$siteUrl+'status_data'

        }).then(function(response){
            $scope.EmpolyeeName= response.data;

            $scope.selectize_val_options=$scope.EmpolyeeName;
            // console.log($scope.selectize_val_options,"EmpolyeeName");
        })
}
$scope.employee_name();
$scope.selectize_val_options = [];

$scope.selectize_val_employee = {
maxItems: 1,
valueField: 'employee_id',
labelField: 'full_name',
create: false,
placeholder: 'Empolyee...'

};




$scope.find = function(postdata){
    console.log(postdata,'postdata')
        var from_d = postdata.from.split('-');
        var to_d = postdata.to.split('-');
        var FD= from_d[2]+"-"+from_d[1]+"-"+from_d[0];
        var TD= to_d[2]+"-"+to_d[1]+"-"+to_d[0];
        postdata.from_date = FD;
        postdata.to_date = TD;
        console.log(postdata,'final date')
    $http({
        method: 'post',
        url: $rootScope.$siteUrl+'leave_report',
        data:postdata
    }).then(function(response){
        $scope.users1 = response.data;
        console.log(response,"find leave")

    })
}


            // $scope.edit = function($event,index,user){
            //     $event.preventDefault();
            //     $scope.entity = $scope.users[index];
            //     $scope.entity.index = index;
            //     $scope.entity.editable = true;
            // };

            // $scope.delete = function($event,index,user){
            //    // $event.preventDefault();
            //     UIkit.modal.confirm('Leave Request submit?', function(){
            //         $scope.users.splice(index,1);
            //     });
            // };

            // $scope.save = function($event,index){
            //     $event.preventDefault();
            //     $scope.users[index].editable = false;

            // };

            // $scope.add = function($event){
            //     $event.preventDefault();
            //     $scope.users.push({
            //         index: $scope.users.length,
            //         name: {
            //             first: '',
            //             last: ''
            //         },
            //         age: '',
            //         email: '',
            //         phone: '',
            //         balance: '0.00',
            //         company: '',
            //         editable : true
            //     });
            // };

    //selectize 
            $scope.selectize_section_config = {
                   
                maxItems: 1,
                valueField: 'section',
                labelField: 'section',
                searchField: 'section',
                create: false,
                placeholder: "Choose..."
        };
        $scope.selectize_section_options=["Approved","Rejected"]




        }
    );