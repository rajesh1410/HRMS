angular
    .module('hrmsApp')
    .controller('TimecalciCtrl', [
        '$scope',
        '$interval',
        '$http',
        '$toast',
        '$rootScope',





        function ($scope, $interval, $http, $toast, $rootScope) {


            /* #region  global variables */
            $scope.mydate = new Date();
            $scope.minutes = "00";
            $scope.seconds = "00";
            $scope.hours = "00";
            var totalSeconds = 0;

            $scope.minutes1 = "00";
            $scope.seconds1 = "00";
            $scope.hours1 = "00";
            var totalSeconds1 = 0;


            $scope.minutes2 = "00";
            $scope.seconds2 = "00";
            $scope.hours2 = "00";
            var totalSeconds2 = 0;

            $scope.minutes3 = "00";
            $scope.seconds3 = "00";
            $scope.hours3 = "00";
            var totalSeconds3 = 0;



            $scope.label1 = true;
            $scope.label2 = true;
            $scope.label3 = true;
            $scope.label4 = true;
            $scope.worklabel = true;
            $scope.discallmini = true;
            $scope.dislunchmini = true;
            $scope.disbreakmini = true;
            $scope.disin = false;
            $scope.disout = true;
            $scope.hide_big_callbutton = true;
            $scope.hide_big_logoutbutton = false;
            $scope.hide_big_lunchbutton = true;
            $scope.hide_big_breakbutton = true;

            //LocalStorage

            var data = localStorage.getItem('response.data');
            var data1 = JSON.parse(data);
            console.log(data1, 'localdata');
            var EmpId = data1[0].EmployeeId;
            var position = data1[0].Position;




            /* #endregion */

            $scope.start = function () {
                var formdata = {
                    'employee_name': EmpId,
                    'position': position
                };
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'login',
                    data: formdata
                }).then(function success(response) {
                    id = response.data;
                    console.log(response, 'test')
                    $scope.timer();
                });
                if ($scope.nowTime) {
                    $scope.login();
                } else {
                    $scope.currentTime();
                    $scope.login();
                }

            }




            var id;
            var login_id;
            var lunch_id;
            var call_id;
            var break_id;
            $scope.timer = function () {
                formdata = {
                    type: 'login',
                    attendance_id: id,
                    position: position
                }
                // if(login_id != null){
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'strat_time',
                    data: formdata
                }).then(function success(response) {
                    console.log(response, 'timer')
                    login_id = response.data.id;
                    $toast('LogIn', 'success');
                });
                // }
            }

            /* #region  currentTime() */




            $scope.currentTime = function () {

                var date = new Date();
                var hours = date.getHours();
                var minutes = date.getMinutes();

                // Check whether AM or PM 
                var newformat = hours >= 12 ? 'PM' : 'AM';

                // Find current hour in AM-PM Format 
                hours = hours % 12;

                // To display "0" as "12" 
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;

                // document.getElementById("change").innerHTML =
                //     hours + ':' + minutes + ' ' + newformat;
                // if(log_id == null)
                $scope.nowTime = hours + ':' + minutes + ' ' + newformat;

                $scope.dsblBtn = true;
            }


            $scope.chartist_simple_pie_data = {
                series: [5, 3, 4]
            };
            var sum = function (a, b) {
                return a + b
            };
            $scope.chartist_simple_pie_options = {
                labelInterpolationFnc: function (value) {
                    return Math.round(value / $scope.chartist_simple_pie_data.series.reduce(sum) * 100) + '%';

                }
            }

            /* #endregion */




            /* #region  worktime */
            /* #region  setTime() */
            function pad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                }
            }

            $scope.setTime = function () {

                totalSeconds++;
                $scope.seconds = pad(totalSeconds % 60);
                $scope.minute = pad(parseInt(totalSeconds / 60));
                $scope.minutes = pad(parseInt($scope.minute % 60));
                $scope.hours = pad(parseInt($scope.minute / 60));


            }
            /* #endregion */


            /* #region  Login() */
            $scope.login = function (postdata) {

                $scope.label1 = false;
                $scope.label2 = true;
                $scope.label3 = true;
                $scope.label4 = true;
                $scope.worklabel = false;
                $scope.hidData = true;
                $scope.disin = true;
                $scope.disout = false;
                $scope.discallmini = false;
                $scope.dislunchmini = false;
                $scope.disbreakmini = false;


                if (postdata == null) {
                    timer = $interval(function () {
                        $scope.setTime()
                    }, 1000);
                } else {
                    totalSeconds = postdata;
                    timer = $interval(function () {
                        $scope.setTime()
                    }, 1000);
                }







            }

            /* #endregion */


            /* #region  Logout() */
            $scope.logout = function () {
                $scope.minutes = "00";
                $scope.seconds = "00";
                $scope.hours = "00";
                totalSeconds = 0;
                $interval.cancel(timer);
                timer = undefined;

                $scope.worklabel = true;
                $scope.hidData = false;
                $scope.disin = false;
                $scope.disout = true;
                $scope.label1 = true;
                $scope.label2 = true;
                $scope.label3 = true;
                $scope.label4 = true;
                $scope.callout = true;
                $scope.discallmini = true;
                $scope.dislunchmini = true;
                $scope.disbreakmini = true;
                $scope.hide_big_logoutbutton = false;
                $scope.nowTime = undefined;



                formdata = {
                    type: 'login'
                }
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'end_time/' + login_id,
                    data: formdata
                }).then(function success(response) {
                    $scope.totalhrs(response.data);
                    $toast('Logout', 'success');
                });
            }









            /* #region  Out Call */
            function cad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                }
            }
            $scope.wetTime = function () {

                totalSeconds1++;
                $scope.seconds1 = cad(totalSeconds1 % 60);
                $scope.minute = cad(parseInt(totalSeconds1 / 60));
                $scope.minutes1 = cad(parseInt($scope.minute % 60));
                $scope.hours1 = cad(parseInt($scope.minute / 60));
                // $scope.total = pad($scope.hours % 60);


            }

            $scope.calling = function (postdata) {
                $scope.worklabel = false;
                $scope.label1 = false;
                $scope.label2 = false;
                $scope.label3 = true;
                $scope.label4 = true;
                $scope.hide_big_callbutton = false;
                $scope.hide_big_logoutbutton = true;

                $scope.discallmini = true;
                $scope.dislunchmini = true;
                $scope.disbreakmini = true;
                $scope.discallout = false;
                $interval.cancel(timer);
                if (postdata == null) {
                    gamer = $interval(function () {
                        $scope.wetTime()
                    }, 1000);
                } else {
                    totalSeconds1 = postdata
                    gamer = $interval(function () {
                        $scope.wetTime()
                    }, 1000);
                }

                if (call_id == null) {
                    formdata = {
                        type: 'call',
                        attendance_id: id,
                        position: position
                    }
                    $http({
                        method: 'post',
                        url: $rootScope.$siteUrl + 'strat_time',
                        data: formdata
                    }).then(function success(response) {
                        call_id = response.data.id;
                        $toast('Out For Call', 'success');
                    });
                }

            }
            $scope.calloff = function () {
                $scope.minutes1 = "00";
                $scope.seconds1 = "00";
                $scope.hours1 = "00";
                totalSeconds1 = 0;
                $scope.hide_big_callbutton = true;
                $scope.hide_big_logoutbutton = false;
                $interval.cancel(gamer);
                gamer = undefined;

                $scope.worklabel = false;
                $scope.hidData = true;
                $scope.disin = false;



                $scope.label1 = false;
                $scope.label2 = true;
                $scope.label3 = true;
                $scope.label4 = true;



                $scope.discallmini = false;
                $scope.dislunchmini = false;
                $scope.disbreakmini = false;


                $scope.hide_big_lunchbutton = true;
                $scope.hide_big_breakbutton = true;

                $scope.login();
                formdata = {
                    type: 'call'
                }
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'end_time/' + call_id,
                    data: formdata
                }).then(function success(response) {
                    $scope.totalhrs(response.data);
                    $toast('Finshed Call', 'success');
                });




            }
            /* #endregion */





            /* #region  Lunch time calci  */
            function lad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                }
            }
            $scope.letTime = function () {

                totalSeconds2++;
                $scope.seconds2 = lad(totalSeconds2 % 60);
                $scope.minute = lad(parseInt(totalSeconds2 / 60));
                $scope.minutes2 = lad(parseInt($scope.minute % 60));
                $scope.hours2 = lad(parseInt($scope.minute / 60));
                // $scope.total = pad($scope.hours % 60);


            }

            $scope.lunchin = function (postdata) {
                $scope.worklabel = false;
                $scope.label1 = false;
                $scope.label2 = true;
                $scope.label3 = false;
                $scope.label4 = true;
                $scope.hide_big_callbutton = true;
                $scope.hide_big_breakbutton = true;
                $scope.hide_big_logoutbutton = true;
                $scope.hide_big_lunchbutton = false;
                $scope.disin = true;
                $scope.discallmini = true;
                $scope.dislunchmini = true;
                $scope.disbreakmini = true;
                $scope.discallout = true;

                $interval.cancel(timer);
                if (postdata == null) {
                    lamer = $interval(function () {
                        $scope.letTime()
                    }, 1000);
                } else {
                    totalSeconds2 = postdata;
                    lamer = $interval(function () {
                        $scope.letTime()
                    }, 1000);
                }

                if (lunch_id == null) {
                    formdata = {
                        type: 'lunch',
                        attendance_id: id,
                        position: position
                    }
                    $http({
                        method: 'post',
                        url: $rootScope.$siteUrl + 'strat_time',
                        data: formdata
                    }).then(function success(response) {
                        lunch_id = response.data.id;
                        $toast('Out For Lunch', 'success');
                    });
                }

            }
            $scope.lunchout = function () {
                $scope.minutes2 = "00";
                $scope.seconds2 = "00";
                $scope.hours2 = "00";
                totalSeconds2 = 0;
                $interval.cancel(lamer);
                lamer = undefined;


                $scope.worklabel = false;
                $scope.hidData = true;
                $scope.disin = false;


                $scope.label1 = false;
                $scope.label2 = true;
                $scope.label3 = true;
                $scope.label4 = true;

                $scope.disout = false;
                $scope.discallmini = false;
                $scope.dislunchmini = false;
                $scope.disbreakmini = false;
                $scope.discallout = true;
                $scope.hide_big_callbutton = true;
                $scope.hide_big_breakbutton = true;
                $scope.hide_big_lunchbutton = true;
                $scope.hide_big_logoutbutton = false;


                $scope.login();

                formdata = {
                    type: 'lunch'
                }
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'end_time/' + lunch_id,
                    data: formdata
                }).then(function success(response) {
                    $scope.totalhrs(response.data);
                    $toast('Finshed Lunch', 'success');
                });



            }

            /* #endregion */






            /* #region  Break time calci */

            function bad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                }
            }
            $scope.betTime = function () {

                totalSeconds3++;
                $scope.seconds3 = bad(totalSeconds3 % 60);
                $scope.minute = bad(parseInt(totalSeconds3 / 60));
                $scope.minutes3 = bad(parseInt($scope.minute % 60));
                $scope.hours3 = bad(parseInt($scope.minute / 60));
                // $scope.total = pad($scope.hours % 60);


            }

            $scope.breakin = function (postdata) {
                $scope.worklabel = false;
                $scope.label1 = false;
                $scope.label4 = false;
                $scope.label2 = true;
                $scope.label3 = true;


                $scope.hide_big_callbutton = true;
                $scope.hide_big_breakbutton = false;
                $scope.hide_big_logoutbutton = true;
                $scope.hide_big_lunchbutton = true;


                $scope.discallmini = true;
                $scope.dislunchmini = true;
                $scope.disbreakmini = true;
                $scope.discallout = true;
                $scope.disin = true;
                $interval.cancel(timer);
                if (postdata == null) {
                    bamer = $interval(function () {
                        $scope.betTime()
                    }, 1000);
                } else {
                    totalSeconds3 = postdata;
                    bamer = $interval(function () {
                        $scope.betTime()
                    }, 1000);
                }

                if (break_id == null) {
                    formdata = {
                        type: 'BreaK',
                        attendance_id: id,
                        position: position
                    }
                    $http({
                        method: 'post',
                        url: $rootScope.$siteUrl + 'strat_time',
                        data: formdata
                    }).then(function success(response) {
                        break_id = response.data.id;
                        $toast('Out For Break', 'success');
                    });
                }

            }
            $scope.breakout = function () {
                $scope.minutes3 = "00";
                $scope.seconds3 = "00";
                $scope.hours3 = "00";
                totalSeconds3 = 0;
                $interval.cancel(bamer);
                bamer = undefined;


                $scope.worklabel = false;
                $scope.hidData = true;
                $scope.disin = false;


                $scope.label1 = false;
                $scope.label2 = true;
                $scope.label3 = true;
                $scope.label4 = true;

                $scope.disout = false;
                $scope.discallmini = false;
                $scope.dislunchmini = false;
                $scope.disbreakmini = false;

                $scope.hide_big_callbutton = true;
                $scope.hide_big_breakbutton = true;
                $scope.hide_big_lunchbutton = true;
                $scope.hide_big_logoutbutton = false;


                $scope.login();
                formdata = {
                    type: 'break'
                }
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'end_time/' + break_id,
                    data: formdata
                }).then(function success(response) {
                    $toast('Finshed Break', 'success');
                    $scope.totalhrs(response.data);
                });





            }
            /* #endregion */


            $scope.totalhrs = function (postdata) {
                $scope.Id = postdata.id;
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'total_time/' + $scope.Id,
                    data: postdata

                }).then(function (response) {
                    $scope.data = response.data;
                    if ($scope.data.type == 'login') {
                        $scope.join();
                    }
                });
            }

            $scope.join = function () {
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'total_hrs/' + id,

                }).then(function (response) {
                    $scope.getallData();
                });
            }
            $scope.getallData = function () {
                // $(".http_preloader").show(); 
                formdata = {
                    'employee_id': EmpId
                };
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'get',
                    data: formdata

                }).then(function (response) {
                    $scope.data = response.data[0];
                    if ($scope.data == null) {
                        $scope.attendance_check();
                    }
                    $scope.table($scope.data);
                    // $(".http_preloader").hide(); 
                })
            }
            $scope.getallData();
            $scope.table = function (postdata) {

                var Id = postdata.id;

                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl + 'total_hour/' + Id

                }).then(function (response) {
                    $scope.call = response.data[0];
                    $scope.lunch = response.data[1];
                    $scope.break = response.data[2];
                    $scope.total = response.data[3];
                    $scope.attendance_check();
                });
            }


            $scope.attendance_check = function () {
                postdata = {
                    'employee_id': EmpId
                };
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'attendance_check',
                    data: postdata
                }).then(function (response) {
                    console.log(response, 'attendance check')
                    if (response.data[0] != null) {
                        $scope.timer_check(response.data[0]);
                    }
                })
            }

            $scope.timer_check = function (postdata) {
                console.log('timer check postdata', postdata)
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl + 'timer_check/' + postdata.id
                }).then(function (response) {
                    $scope.data = response.data[0];
                    $scope.data1 = response.data[1];
                    console.log('timer check postdata', response.data)

                    if ($scope.data.type == 'login') {
                        id = $scope.data.attendance_id;
                        $scope.log_watch($scope.data);

                        login_id = $scope.data.id;
                        if ($scope.data1.type == 'call') {
                            call_id = $scope.data1.id;
                            $scope.break_watch($scope.data1);
                        } else if ($scope.data1.type == 'lunch') {
                            lunch_id = $scope.data1.id;
                            $scope.break_watch($scope.data1);
                        } else {
                            break_id = $scope.data1.id;
                            $scope.break_watch($scope.data1);
                        }
                    }

                });
            }

            $scope.log_watch = function (postdata) {
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'stop_watch',
                    data: postdata
                }).then(function (response) {
                    var total_time = response.data[0]
                    $scope.login(total_time);
                })
            }
            $scope.break_watch = function (postdata) {
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl + 'stop_watch',
                    data: postdata
                }).then(function (response) {
                    var time = response.data[0];
                    var type = response.data[1];
                    if (type == 'call') {
                        $scope.calling(time);
                    } else if (type == 'lunch') {
                        $scope.lunchin(time);
                    } else {
                        $scope.breakin(time);
                    }
                })
            }








        }
    ]);