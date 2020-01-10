angular
    .module('hrmsApp')
    .controller('timer_dataCtrl', [
        '$scope',
        '$timeout',
        '$http',
        '$toast',
        '$rootScope',
        '$stateParams',
        function ($scope, $timeout, $http, $toast, $rootScope, $stateParams) {

            var $formValidate = $('#form_validation');
            $scope.mask = function () {
                // masked inputs
                var $maskedInput = $('.masked_input');
                if ($maskedInput.length) {
                    $maskedInput.inputmask();
                }
            }

            // selectize

            // $scope.employee = function(){
            //     $http({
            //             method: 'get',
            //             url: $rootScope.$siteUrl+'status_data'

            //         }).then(function(response){
            //             $scope.employee = response.data;
            //             $scope.selectize_emp_options = $scope.employee
            //             console.log($scope.selectize_emp_options,'jihgjh')
            //         })
            // }


            $scope.selectize_type_options = [{
                    value: 'call',
                    label: 'Call'
                },
                {
                    value: 'lunch',
                    label: 'Lunch'
                },
                {
                    value: 'break',
                    label: 'Break'
                }
            ];


            $scope.selectize_type_config = {
                maxItems: 1,
                valueField: 'value',
                labelField: 'label',
                create: false,
                placeholder: 'Choose Type...'

            };

            // masked inputs
            var $maskedInput = $('.masked_input');
            if ($maskedInput.length) {
                $maskedInput.inputmask();
            }

            //EDIT DATA
            $scope.edit = function ($event, index, user) {
                $scope.mask();
                $event.preventDefault();
                $scope.entity = $scope.data[index];
                $scope.entity.index = index;
                $scope.entity.editable = true;
            };

            //DELETE DATA

            $scope.delete = function ($event, index, user) {
                console.log(user, "delete")
                $event.preventDefault();
                UIkit.modal.confirm('Are you sure?', function () {
                    $scope.user.splice(index, 1);
                    $http({
                        method: 'delete',
                        url: $rootScope.$siteUrl + 'timer_delete/' + user.id,
                        // trainee:trainees
                    }).then(function (response) {
                        $scope.user = response.data;
                        $scope.get_break(id);
                        $toast("Break Deleted", 'success')
                        console.log(response, "rajeshresponse")
                    })
                });
            };
            //SAVE DATA
            $scope.save = function ($event, index, user) {
                console.log(user, "save")
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'manual_update/' + user.id,
                    data: user
                }).then(function (response) {
                    $scope.get_break(id);
                    console.log(response.data, 'table save function')
                    $scope.totalhrs(response.data)
                    $toast("update time", "success");
                })
                $event.preventDefault();
                $scope.data[index].editable = false;

            };

            //get break employee
            var id = $stateParams.Id
            $scope.get_break = function (Id) {
                $(".http_preloader").show();
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl + 'manual_get/' + Id
                }).then(function (response) {
                    $scope.data = response.data;
                    $scope.one_id();
                    $(".http_preloader").hide();
                })
            }
            if (id) {
                $scope.get_break(id);
            }
            $scope.one_id = function () {
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl + 'one_id/' + id
                }).then(function (response) {
                    console.log(response.data, 'one id');
                    $scope.one_emp(response.data);
                })
            }
            $scope.one_emp = function (postdata) {
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'one_emp',
                    data: postdata
                }).then(function (response) {
                    $scope.employee = response.data[0];
                    $scope.employee1 = response.data;
                    console.log($scope.employee, 'one emp')
                    $scope.selectize_emp_options = $scope.employee1;
                })
            }

            $scope.selectize_emp_options = [];


            $scope.selectize_emp_config = {
                maxItems: 1,
                valueField: 'employee_id',
                labelField: 'full_name',
                create: false,
                placeholder: 'Choose Employee...'

            };

            $scope.add = function (postdata) {
                postdata.attendance_id = id
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'strat_time',
                    data: postdata
                }).then(function (response) {
                    $scope.data = response.data;
                    if ($scope.data.end_time != null) {
                        $scope.totalhrs(response.data)
                    }
                    console.log($scope.data, 'manually add')
                    UIkit.modal('#new_log').hide();
                    $toast('Add Break', 'success');
                    $scope.get_break(id);
                })
            }

            $scope.totalhrs = function (postdata) {
                $scope.Id = postdata.id;
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'total_time/' + $scope.Id,
                    data: postdata

                }).then(function (response) {
                    $scope.data = response.data;
                    console.log(response.data, 'timer ends')
                    if ($scope.data.type == 'login') {
                        $scope.join($scope.data);
                    }
                    $scope.get_break(response.data.attendance_id);
                });
            }
            $scope.join = function (postdata) {
                console.log(postdata, 'join postdata')
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'total_hrs/' + postdata.attendance_id,
                    data: postdata
                }).then(function (response) {
                    console.log(response, 'total worked hrs calculation');
                });
            }





        }




    ]);