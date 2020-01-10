hrmsApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {

            $locationProvider.hashPrefix('');

            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                .when('/login', '/')
                .otherwise('/');

            $stateProvider
                // -- ERROR PAGES --
                .state("error", {
                    url: "/error",
                    templateUrl: 'app/views/error.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit'
                            ]);
                        }]
                    }
                })
                .state("error.404", {
                    url: "/404",
                    templateUrl: 'app/components/pages/error_404View.html'
                })
                .state("error.500", {
                    url: "/500",
                    templateUrl: 'app/components/pages/error_500View.html'
                })
                // -- LOGIN PAGE --
                .state('login', {
                    url: "/",
                    templateUrl: 'app/components/login/loginView.html',
                    controller: 'loginCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_iCheck',
                                'lazy_parsleyjs',
                                'app/components/login/loginController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Login'
                    }
                })
                // -- RESTRICTED --
                .state("restricted", {
                    abstract: true,
                    url: "",
                    templateUrl: 'app/views/restricted.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_selectizeJS',
                                'lazy_switchery',
                                'lazy_prismJS',
                                'lazy_autosize',
                                'lazy_iCheck',
                                'lazy_themes'
                            ]);
                        }]
                    }
                })
                .state("restricted.dashboard", {
                    url: "/dashboard",
                    templateUrl: 'app/components/dashboard/dashboardView.html',
                    controller: 'dashboardCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                            	'lazy_countUp',
                                'lazy_charts_peity',
                                'lazy_charts_easypiechart',
                                'lazy_charts_metricsgraphics',
                                'lazy_charts_chartist',
                                'lazy_weathericons',
                                'lazy_clndr',
                                'lazy_google_maps',
                                'app/components/dashboard/dashboardController.js'
                            ], {
                                serie: true
                            });
                        }],
                        sale_chart_data: function($http) {
                            return $http({
                                    method: 'GET',
                                    url: 'data/mg_dashboard_chart.min.json'
                                })
                                .then(function(data) {
                                    return data.data;
                                });
                        },
                        user_data: function($http) {
                            return $http({
                                    method: 'GET',
                                    url: 'data/user_data.json'
                                })
                                .then(function(data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Dashboard'
                    }
                })
                   //--- Employees view ---

                 .state("restricted.employee_view", {
                    url: "/employee_view/?Id",
                    templateUrl: 'app/components/Employees/employee_view.html',
                    controller: 'employee_viewCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/Employees/employee_view.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Employee View'
                    }
                })

                //---- Employee edit ----

                 .state("restricted.employee_edit", {
                    url: "/employee_edit",
                    templateUrl: 'app/components/Employees/employee_edit.html',
                    controller: 'employee_editCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_dropify',
                                'app/components/Employees/employee_edit.js'

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Employee Edit'
                    }
                })

                //---- Monitor Attendance ----

                .state("restricted.Timecalci", {
                    url: "/monitor_attendance",
                    templateUrl: 'app/components/Attendance/Timecalci.html',
                    controller: 'TimecalciCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_ckeditor',
                                'lazy_masked_inputs',
                                'lazy_parsleyjs',
                                'app/components/Attendance/Timecalci.js'
                            ], { serie: true });
                        }]
                    },
                    data: {
                        pageTitle: 'Moniter Attendance'
                    }
                })

                //---- Holidays----
                 //---- Holidays----
                 .state("restricted.calendar", {
                    url: "/calendar",
                    templateUrl: 'app/components/Holidays/holidaysview.html',
                    controller: 'calendarCtrl_holidays',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_fullcalendar',
                                'lazy_masked_inputs',
                                // 'lazy_parsleyjs',
                                'lazy_wizard',
                                'app/components/Holidays/holidaysctrl.js',
                            ]);
                        }],holidayData: function($http){
                            return $http({ method: 'GET', url: 'http://appwebstore.com/api/CalHolidays'})
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Calendar'
                    }
                })

                //---- Employee datatable ----

                 .state("restricted.Employees", {
                    url: "/employees",
                    templateUrl: 'app/components/Employees/Employeesview.html',
                    controller: 'EmployeesCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'bower_components/angular-resource/angular-resource.min.js',
                                'lazy_datatables',
                                 'lazy_parsleyjs',
                                'app/components/Employees/EmployeesController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Employees'
                    }
                })

                //---- Leave Applications ---

                .state("restricted.Leave_Applications", {
                    url: "/leave_applications/?Id",
                    templateUrl: 'app/components/Employees/leaveappview.html',
                    controller: 'LeaveApplicationCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'bower_components/angular-resource/angular-resource.min.js',
                                'lazy_masked_inputs',
                                'lazy_parsleyjs',
                                'lazy_datatables',
                                'app/components/Employees/leaveappController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Leave Applications'
                    }
                })

                //----Jobdetails----

                .state("restricted.Jobdetails", {
                    url: "/job_details",
                    templateUrl: 'app/components/Jobdetails/Jobdetailsview.html',
                    controller: 'JobdetailsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_masked_inputs',
                                'lazy_datatables',
                                'app/components/Jobdetails/JobdetailsController.js'
                            ]);
                        }],
                        snippets_data: function($http){
                            return $http({ method: 'GET', url: 'data/snippets.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Job Details'
                    }
                })

                //----payroll---

                 .state("restricted.Payroll", {
                    url: "/payroll",
                    template: '<div ui-view autoscroll="false"/>',
                    abstract: true
                })
                  .state("restricted.Payroll.salary", {
                    url: "/Salary",
                    templateUrl: 'app/components/Payroll/salary.html',
                    controller: 'salaryCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/Payroll/salary.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Salary'
                    }
                })

                //--- advancedsalary----

                .state("restricted.Payroll.advancedsalary", {
                    url: "/Advanced Salary",
                    templateUrl: 'app/components/Payroll/advancedsalary.html',
                    controller: 'dt_default',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([

                                'bower_components/angular-resource/angular-resource.min.js',
                                'lazy_datatables',
                                'app/components/Payroll/advancedsalary.js'

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Advanced Salary'
                    }
                })

                //project
                .state("restricted.projects", {
                    url: "/contact_list_horizontal",
                    templateUrl: 'app/components/Projects/projectview.html',
                    controller: 'contact_list_horizontalCtrl1',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/Projects/projectctrl.js',
                                'lazy_selectizeJS',
                                // 'lazy_clear_button',
                                'lazy_dropify'
                            ],{serie: true});
                        }],
                        contact_list: function($http){
                            return $http({ method: 'GET', url: 'data/Objectlist.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Contact List Horizontal'
                    }
                })


                //ProjectEmp

                .state("restricted.ProjectsEmp", {
                    url: "/contact_list_horizontalCtrl2",
                    templateUrl: 'app/components/ProjectsEmp/ProjectsEmpview.html',
                    controller: 'contact_list_horizontalCtrl2',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/ProjectsEmp/ProjectsEmpctrl.js',
                                // 'lazy_selectizeJS',
                                // 'lazy_clear_button',
                                // 'lazy_dropify'
                            ],{serie: true});
                        }],
                        contact_list: function($http){
                            return $http({ method: 'GET', url: 'data/Objectlist.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Contact List Horizontal'
                    }
                })


                //---- Traine form----

                .state("restricted.Trainee", {
                    url: "/trainee/?Id",
                    templateUrl: 'app/components/trainee/traineeformview.html',
                    controller: 'TraineeCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_parsleyjs',
                                'lazy_uiSelect',
                                'app/components/trainee/traineeformController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Trainee'
                    }
                })

                //---- Trainee Data ----

                 .state("restricted.traineedata", {
                    url: "/trainee_data/?Id",
                    templateUrl: 'app/components/trainee/Traineedata.html',
                    controller: 'traineedataCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'bower_components/angular-resource/angular-resource.min.js',
                                'lazy_datatables',
                                 'lazy_parsleyjs',
                                'app/components/trainee/TraineedataController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Traine Data'
                    }
                })

                //---- Taskreports -----

                .state("restricted.Taskreports", {
                    url: "/task_reports",
                    templateUrl: 'app/components/taskreport/Taskreports.html',
                    controller: 'taskCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_dragula',
                                'lazy_selectizeJS',
                                'app/components/taskreport/Taskreports.js',
                                'lazy_dropify'
                            ], { serie: true });
                        }],
                        tasks_list: function($http) {
                            return $http({ method: 'GET', url: 'data/tasks_list.json' })
                                .then(function(data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Task Reports'
                    }
                })

//---- Taskreports Emp -----

                .state("restricted.TaskreportsEmp", {
                    url: "/task_reports_emp",
                    templateUrl: 'app/components/taskreportEmp/TaskreportsEmp.html',
                    controller: 'taskCtrlEmp',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_dragula',
                                'lazy_selectizeJS',
                                'app/components/taskreportEmp/TaskreportsEmp.js',
                                'lazy_dropify'
                            ], { serie: true });
                        }],
                        tasks_list: function($http) {
                            return $http({ method: 'GET', url: 'data/tasks_list.json' })
                                .then(function(data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Task Reports'
                    }
                })


                //---- user ---
                .state("restricted.user", {
                    url: "/user",
                    templateUrl: 'app/components/user/userView.html',
                     controller: 'userCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_masked_inputs',
                                'lazy_datatables',
                                'app/components/user/userController.js'
                            ], {serie: true});
                        }]
                    },
                    data: {
                        pageTitle: 'Users'
                    }
                })
                //---- leave -----
                 .state("restricted.leave", {
                    url: "/leave",
                    templateUrl: 'app/components/leave/leave1.html',
                    controller: 'leaveCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'bower_components/angular-resource/angular-resource.min.js',
                                'lazy_datatables',
                                'lazy_selectizeJS',
                                'lazy_parsleyjs',
                                'app/components/leave/leave1.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Leave'
                    }
                })

                    .state("restricted.Employeeleavetable", {
                    url: "/employee_leave_table",
                    templateUrl: 'app/components/Employeeleavetable/Employeeleavetable.html',
                    controller:'EmployeeleavetableContrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'bower_components/angular-resource/angular-resource.min.js',
                                'lazy_datatables',
                                'lazy_selectizeJS',
                                'lazy_parsleyjs',
                                'app/components/Employeeleavetable/Employeeleavetable.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Employee Leave Table'
                    }
                })
                //--- register ---
                .state("restricted.register", {
                    url: "/register/?Id",
                    templateUrl: 'app/components/register/register.html',
                    controller: 'registerCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_dropify',
                                'app/components/register/register.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Register'
                    }
                })
                
                //Position
                .state("restricted.position", {
                    url: "/position",
                    templateUrl: 'app/components/Position/positionview.html',
                    controller: 'Positioncontroller',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_datatables',
                                'app/components/Position/positionctrl.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Position'
                    }
                })

                .state("restricted.EmployeesData", {
                    url: "/employees_data/?Id",
                    templateUrl: 'app/components/register/EmployeesData.html',
                    controller: 'EmployeesDataCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'bower_components/angular-resource/angular-resource.min.js',
                                'lazy_datatables',
                                'lazy_parsleyjs',
                                'lazy_uikit',
                                'lazy_iCheck',
                                'app/components/register/EmployeesDataController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Employees Data'
                    }
                })
                //today attendance data
                .state("restricted.attendance_data", {
                    url: "/attendace_data",
                    templateUrl: 'app/components/Attendance/attendance_data.html',
                     controller: 'attendanceCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_masked_inputs',
                                'lazy_parsleyjs',
                                'lazy_datatables',
                                'app/components/Attendance/attendance_data.js'
                            ], {serie: true});
                        }]
                    },
                    data: {
                        pageTitle: 'Attendance Data'
                    }
                })

                .state("restricted.timer_data", {
                    url: "/timer_data/?Id",
                    templateUrl: 'app/components/Attendance/timer_data.html',
                    controller: 'timer_dataCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_masked_inputs',
                                'lazy_parsleyjs',
                                'lazy_datatables',
                                'app/components/Attendance/timer_data.js'
                            ]);
                        }],
                        snippets_data: function($http){
                            return $http({ method: 'GET', url: 'data/snippets.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Timer Data'
                    }
                })

                //Attendance Report
                .state("restricted.attendance_report", {
                    url: "/attendance_report",
                    templateUrl: 'app/components/Attendance/attendance_report.html',
                    controller: 'attendance_reportCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'bower_components/angular-resource/angular-resource.min.js',
                                'lazy_datatables',
                                 'lazy_parsleyjs',
                                'app/components/Attendance/attendance_report.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Attendance Report'
                    }
                })

                // manual add attendanace add

                .state("restricted.manual_attendance", {
                    url: "/manual_attendace",
                    templateUrl: 'app/components/Attendance/manual_attendance.html',
                     controller: 'manual_attendanceCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_masked_inputs',
                                'lazy_parsleyjs',
                                'lazy_datatables',
                                'app/components/Attendance/manual_attendance.js'
                            ], {serie: true});
                        }]
                    },
                    data: {
                        pageTitle: 'Manual Attendance'
                    }
                })



        }
    ]);