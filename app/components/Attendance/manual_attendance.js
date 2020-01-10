angular
    .module('hrmsApp')
    .controller('manual_attendanceCtrl', [
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        '$filter',
        '$timeout',
        '$http',
        '$toast',
        function ($scope, $rootScope, $window, $timeout, $filter, $timeout, $http, $toast) {


            //LocalStorage
            var data = localStorage.getItem('response.data');
            var data1 = JSON.parse(data);
            // console.log(data1, 'localdata');
            var employee_id = data1[0].EmployeeId;
            var position = data1[0].Position;
            // console.log(position, 'position')


            //Get employee name

            $scope.get_employee = function () {
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl + 'status_data',

                }).then(function (response) {
                    $scope.employee = response.data;
                    $scope.selectize_val_options = $scope.employee;
                })
            }
            $scope.get_employee();


            // Selectize TraneeName

            $scope.selectize_val_options = [];
            $scope.selectize_val_config = {
                maxItems: 1,
                valueField: 'employee_id',
                labelField: 'full_name',
                create: false,
                placeholder: 'Employee Name..'
            };



            $scope.selectize_cb_options = ['call', 'break'];
            $scope.selectize_cb_config = {
                maxItems: 1,
                create: false,
                placeholder: 'Select Type..'
            }



            // clone one
            $scope.cloneS = function () {
                $scope.attendance_data = [{
                    "cb_type": '',
                    "start": '',
                    "end": ''
                }];
            }
            $scope.cloneS();
            $scope.cloneSection = function () {
                $scope.attendance_data.push({
                    "cb_type": '',
                    "start": '',
                    "end": ''
                })
                $scope.mask();
            }


            // delete section
            $scope.deleteSection = function ($event, $index) {
                $scope.attendance_data.splice($index, 1);
            };




            // masked inputs
            $scope.mask = function () {
                $timeout(function () {
                    var $maskedInput = $('.masked_input');
                    if ($maskedInput.length) {
                        $maskedInput.inputmask();
                    }
                }, 100)
            }
            $scope.mask();


            $scope.atten = function () {
                $scope.attendance = {
                    login_type: 'login',
                    lunch_type: 'lunch',
                    employee_name:'',
                    date:'',
                    start:'',
                    out_for_lunch:'',
                    lunch_end:'',
                    login_end:''

                }
            }
            $scope.atten();

            $scope.test = function (postdata) {
                postdata.cb = $scope.attendance_data;
                $(".http_preloader").show();
                postdata.position = position;
                var per_d = postdata.date.split('-');
                postdata.date = per_d[2] + "-" + per_d[1] + "-" + per_d[0];
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'login',
                    data: postdata
                }).then(function (response) {
                    id = response.data;
                    $scope.time(postdata);
                })
            }
            var id;
            $scope.time = function (postdata) {
                postdata.attendance_id = id;
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'full_attendance_data',
                    data: postdata
                }).then(function (response) {
                    $scope.total_time(response.data)
                })
            }

            $scope.total_time = function (postdata) {
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'total_hrs/' + postdata[0],
                    data: postdata
                }).then(function (response) {
                    // $scope.attendance = {};
                    
                    var index = postdata[1];
                    while (index > -1) {
                        $scope.attendance_data.splice(index, 1);
                        index--;
                    }
                    $scope.atten();
                    $scope.cloneS();
                    $(".http_preloader").hide();
                    $toast('Employee Attendance Added', 'success');
                });
            }



        }
    ]);