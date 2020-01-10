angular
    .module('hrmsApp')
    .controller('attendanceCtrl', [
        '$scope',
        '$timeout',
        '$http',
        '$toast',
        '$rootScope',
        function ($scope,$timeout,$http,$toast,$rootScope) {
        var $formValidate = $('#form_validation');

        //LocalStorage
        var data = localStorage.getItem('response.data');
        var data1 = JSON.parse(data);
        console.log(data1,'localdata');
        var employee_id=data1[0].EmployeeId;
        var position=data1[0].Position;
        console.log(position,'position')


//GET DATA

            $scope.getallData = function(){
                $(".http_preloader").show(); 
                $http({
                        method: 'get',
                        url: $rootScope.$siteUrl+'join',
                        // trainee:trainees
                    }).then(function(response){
                        $scope.users = response.data;
                        $(".http_preloader").hide(); 
                    })
            }
            $scope.getallData();

            // masked inputs
            var $maskedInput = $('.masked_input');
            if($maskedInput.length) {
                $maskedInput.inputmask();
            }

            $scope.employee = function(){
                $http({
                        method: 'get',
                        url: $rootScope.$siteUrl+'status_data'

                    }).then(function(response){
                        $scope.employee = response.data;
                        $scope.selectize_emp_options = $scope.employee
                        console.log($scope.selectize_emp_options,'jihgjh')
                    })
            }
            $scope.selectize_emp_options = [];
             
            
            $scope.selectize_emp_config = {
                maxItems: 1,
                 valueField: 'employee_id',
                 labelField: 'full_name',
                create: false,
                placeholder: 'Choose Empolyee...'
            
            };
            $scope.selectize_type_options = [
                {value:'login',label:'Login'},
            ];
             
            
            $scope.selectize_type_config = {
                maxItems: 1,
                 valueField: 'value',
                 labelField: 'label',
                create: false,
                placeholder: 'Choose Type...'
            
            };
var id;

$scope.clear = function(){
    $scope.time = {}
}

            $scope.save = function(postdata) {
                postdata.position = position;
                    var per_d = postdata.date.split('-');
                    var PD= per_d[2]+"-"+per_d[1]+"-"+per_d[0];
                    postdata.date = PD;
                console.log(postdata)
                    $http({
                        method: 'post',
                        url: $rootScope.$siteUrl+'login',
                        data: postdata
                    }).then(function success(response) {
                        id = response.data; 
                        postdata.attendance_id = id;
                        console.log(response,'id')
                        UIkit.modal('#new_log').hide();               
                        $scope.timer(postdata);
                        $scope.clear();
                    });
                

            }
            $scope.timer = function(getdata){
                        $http({
                                method: 'post',
                                url: $rootScope.$siteUrl+'strat_time',
                                data: getdata
                            }).then(function success(response) {
                                login_id = response.data;
                                $scope.getallData();
                                $toast('LogIn employee','success');                      
                            });
                    }


                    






        }
        


    ]);

