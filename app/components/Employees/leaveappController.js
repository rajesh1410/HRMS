angular
    .module('hrmsApp')
    .controller('LeaveApplicationCtrl', [
        '$scope',
        '$rootScope',
        '$timeout',
        '$http',
        '$toast',
        '$state',
        '$stateParams',
        function ($scope, $rootScope, $timeout, $http, $toast, $state, $stateParams) {

            var $formValidate = $('#form_validation');
            var id = $stateParams.Id;




            $scope.totaldays = function (postdata) {
                console.log(postdata, 'check postdata')
                // var time_check = postdata.to_time;
                if (postdata.from_date != null) {
                    var from = postdata.from_date.split('-');
                    var to = postdata.to_date.split('-');
                    $scope.FD = new Date(from[2] + "-" + from[1] + "-" + from[0]);
                    $scope.TD = new Date(to[2] + "-" + to[1] + "-" + to[0]);
                    $scope.leave.totaldays = (($scope.TD - $scope.FD) / 1000 / 60 / 60 / 24) + 1;
                } else {
                    var from1 = postdata.from_time.split(':');
                    var to1 = postdata.to_time.split(':');
                    var date1 = new Date(00, 00, 00, from1[0], from1[1], 00);
                    var date2 = new Date(00, 00, 00, to1[0], to1[1], 00);
                    var diff = date2.getTime() - date1.getTime();
                    var hours = Math.floor(diff / (1000 * 60 * 60));
                    diff -= hours * (1000 * 60 * 60);
                    var mins = Math.floor(diff / (1000 * 60));
                    diff -= mins * (1000 * 60);
                    var time = hours + " : " + mins;
                    $scope.leave.totaldays = hours + " : " + mins;

                    if (time >= "4 : 0" && time != "NaN : NaN") {
                        $scope.leave.leave_type = {};
                        $scope.leave.leave_type = 'halfday';
                        $scope.leave.totaldays = hours + " : " + mins;

                    }
                    if (time < "4 : 0" && time != "NaN : NaN") {
                        $scope.leave.leave_type = {};
                        $scope.leave.leave_type = 'permission';
                        $scope.leave.totaldays = hours + " : " + mins;

                    }
                    if (time >= "7 : 0" && time != "NaN : NaN") {
                        $scope.leave.leave_type = {};
                        $scope.day();
                        $scope.leave = {
                            "employee_name": postdata.employee_name,
                            "leave_type": 'fullday'
                        };
                        // $scope.leave.totaldays = hours + " : " + mins;

                    }
                }



                // $scope.FD= new Date(postdata.Form_date);
                // $scope.TD = new Date(postdata.To_date);
            }
            //Post Data
            $scope.save = function (postdata) {
                // console.log(postdata,"postdata")
                // var date = postdata.permission_date;
                // console.log(date,'date')
                if (postdata.permission_date == null) {
                    var from_d = postdata.from_date.split('-');
                    var to_d = postdata.to_date.split('-');
                    var FD = from_d[2] + "-" + from_d[1] + "-" + from_d[0];
                    var TD = to_d[2] + "-" + to_d[1] + "-" + to_d[0];
                    postdata.from_date = FD;
                    postdata.to_date = TD;
                } else {
                    var per_d = postdata.permission_date.split('-');
                    var PD = per_d[2] + "-" + per_d[1] + "-" + per_d[0];
                    postdata.permission_date = PD;
                }
                console.log(postdata, 'postdata')

                $(".http_preloader").show();
                if (id != null) {
                    $http({
                            method: 'post',
                            url: $rootScope.$siteUrl + 'emp_update/' + id,
                            data: postdata
                        })

                        .then(function success(response) {
                            console.log(response, 'response');
                            $state.go("restricted.Employeeleavetable");

                            $scope.Leave = {};
                            $toast(response.data, 'success');
                            $(".http_preloader").hide();

                        })
                } else {
                    $http({
                            method: 'post',
                            url: $rootScope.$siteUrl + 'leave',
                            data: postdata
                        })

                        .then(function success(response) {
                            console.log(response, 'response');
                            $state.go("restricted.Employeeleavetable");

                            $scope.Leave = {};
                            $toast(response.data, 'success');
                            $(".http_preloader").hide();

                        })
                }



            }
            // GET EMPOLYEE NAME 
            $scope.EmpName = function () {
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl + 'SelectEmp'

                }).then(function (response) {
                    $scope.EmpolyeeName = response.data;

                    $scope.selectize_val_options = $scope.EmpolyeeName;
                    console.log($scope.selectize_val_options, "EmpolyeeName");
                })
            }
            $scope.EmpName();
            $scope.selectize_val_options = [];

            $scope.selectize_val_config = {
                maxItems: 1,
                valueField: 'employee_id',
                labelField: 'full_name',
                create: false,
                placeholder: 'Choose Empolyee...'

            };
            //Form validation

            // $timeout(function() {
            //     $formValidate
            //         .parsley({
            //             'excluded': 'input[type=button], input[role=button], input[type=submit], input[type=reset], input[type=hidden], .selectize-input > input, .md-input.selectized'
            //         })
            //         .on('form:validated',function() {
            //             $scope.$apply();
            //         })
            //         .on('field:validated',function(parsleyField) {
            //             if($(parsleyField.$element).hasClass('md-input') || $(parsleyField.$element).is('select')) {
            //                 $scope.$apply();
            //             }
            //         });
            // });
            // datepicker callback
            $('#val_birth').on('hide.uk.datepicker', function () {
                $formValidate.parsley().validate();
            });

            $scope.people = [{
                    name: 'Adam',
                    email: 'adam@email.com',
                    age: 12,
                    country: 'United States'
                },
                {
                    name: 'Amalie',
                    email: 'amalie@email.com',
                    age: 12,
                    country: 'Argentina'
                },
                {
                    name: 'Estefanía',
                    email: 'estefania@email.com',
                    age: 21,
                    country: 'Argentina'
                },
                {
                    name: 'Adrian',
                    email: 'adrian@email.com',
                    age: 21,
                    country: 'Ecuador'
                },
                {
                    name: 'Wladimir',
                    email: 'wladimir@email.com',
                    age: 30,
                    country: 'Ecuador'
                },
                {
                    name: 'Samantha',
                    email: 'samantha@email.com',
                    age: 30,
                    country: 'United States'
                },
                {
                    name: 'Nicole',
                    email: 'nicole@email.com',
                    age: 43,
                    country: 'Colombia'
                },
                {
                    name: 'Natasha',
                    email: 'natasha@email.com',
                    age: 54,
                    country: 'Ecuador'
                },
                {
                    name: 'Michael',
                    email: 'michael@email.com',
                    age: 15,
                    country: 'Colombia'
                },
                {
                    name: 'Nicolás',
                    email: 'nicolas@email.com',
                    age: 43,
                    country: 'Colombia'
                }
            ];
            $scope.person = {};
            $scope.person.selected = '';

            // masked inputs
            var $maskedInput = $('.masked_input');
            if ($maskedInput.length) {
                $maskedInput.inputmask();
            }


            $scope.date = true;
            $scope.time = true;

            $scope.per = function () {
                $scope.time = $scope.time = false;
                $scope.date = $scope.date = false;
                $scope.leave.totaldays = '';
            }

            $scope.half = function () {
                $scope.time = $scope.time = false;
                $scope.date = $scope.date = false;
                $scope.leave.totaldays = '';
            }

            $scope.day = function () {
                $scope.time = $scope.time = true;
                $scope.date = $scope.date = true;
                $scope.leave.totaldays = '';
            }

            $scope.edit = function (Id) {
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl + 'get_leave/' + Id
                }).then(function (response) {
                    console.log(response.data)
                    $scope.leave = response.data[0];
                    if ($scope.leave.leave_type == 'fullday') {
                        var from_d = $scope.leave.from_date.split('-');
                        var to_d = $scope.leave.to_date.split('-');
                        var FD = from_d[2] + "-" + from_d[1] + "-" + from_d[0];
                        var TD = to_d[2] + "-" + to_d[1] + "-" + to_d[0];
                        $scope.leave.from_date = FD;
                        $scope.leave.to_date = TD;
                    } else {
                        var per_d = $scope.leave.permission_date.split('-');
                        var PD = per_d[2] + "-" + per_d[1] + "-" + per_d[0];
                        $scope.leave.permission_date = PD;
                    }
                    console.log($scope.leave, 'leave response')
                    // $scope.type = $scope.leave.leave_type;
                    if ($scope.leave.leave_type == 'fullday') {
                        $scope.time = $scope.time = true;
                        $scope.date = $scope.date = true;
                    } else if ($scope.leave.leave_type == 'halfday') {
                        $scope.time = $scope.time = false;
                        $scope.date = $scope.date = false;
                    } else {
                        $scope.time = $scope.time = false;
                        $scope.date = $scope.date = false;
                    }
                })
            }
            if (id) {
                $scope.edit(id);
            }





        }
    ]);