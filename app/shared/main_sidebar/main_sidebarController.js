angular
    .module('hrmsApp')
    .controller('main_sidebarCtrl', [
        '$timeout',
        '$scope',
        '$rootScope',
        '$state',
        // '$Sessionmanager',

        function($timeout, $scope, $rootScope) {

//local storage  

            var data = localStorage.getItem('response.data');
            var data1 = JSON.parse(data);
            // console.log(data1,"keerthi");
            

//Main Sidebar

            // $scope.$on('onLastRepeat', function(scope, element, attrs) {
            //     $timeout(function() {
            //         if (!$rootScope.miniSidebarActive) {
            //             // activate current section
            //             $('#sidebar_main').find('.current_section > a').trigger('click');
            //         } else {
            //             // add tooltips to mini sidebar
            //             var tooltip_elem = $('#sidebar_main').find('.menu_tooltip');
            //             tooltip_elem.each(function() {
            //                 var $this = $(this);

            //                 $this.attr('title', $this.find('.menu_title').text());
            //                 UIkit.tooltip($this, {
            //                     pos: 'right'
            //                 });
            //             });
            //         }
            //     })
            // });


            // // language switcher
            // $scope.langSwitcherModel = 'gb';
            // var langData = $scope.langSwitcherOptions = [{
            //     id: 1,
            //     title: 'English',
            //     value: 'gb'
            // }, {
            //     id: 2,
            //     title: 'French',
            //     value: 'fr'
            // }, {
            //     id: 3,
            //     title: 'Chinese',
            //     value: 'cn'
            // }, {
            //     id: 4,
            //     title: 'Dutch',
            //     value: 'nl'
            // }, {
            //     id: 5,
            //     title: 'Italian',
            //     value: 'it'
            // }, {
            //     id: 6,
            //     title: 'Spanish',
            //     value: 'es'
            // }, {
            //     id: 7,
            //     title: 'German',
            //     value: 'de'
            // }, {
            //     id: 8,
            //     title: 'Polish',
            //     value: 'pl'
            // }];
            // $scope.langSwitcherConfig = {
            //     maxItems: 1,
            //     render: {
            //         option: function(langData, escape) {
            //             return '<div class="option">' +
            //                 '<i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' +
            //                 '<span>' + escape(langData.title) + '</span>' +
            //                 '</div>';
            //         },
            //         item: function(langData, escape) {
            //             return '<div class="item"><i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i></div>';
            //         }
            //     },
            //     valueField: 'value',
            //     labelField: 'title',
            //     searchField: 'title',
            //     create: false,
            //     onInitialize: function(selectize) {
            //         $('#lang_switcher').next().children('.selectize-input').find('input').attr('readonly', true);
            //     }
            // };

//For HR and MAnger

if((data1[0].Position == 'HR') || (data1[0].Position=='Manger')){

            $scope.sections = [{
                    id: 1,
                    title: 'Dashboard',
                    icon: 'dashboard',
                    link: 'restricted.dashboard'
                },
                {
                    id: 1,
                    title: 'Admin',
                    icon: 'person',
                    submenu: [{
                            title: 'Job Details',
                            link: 'restricted.Jobdetails'
                        },
                        {
                            title: 'Users',
                            link: 'restricted.user'
                        },
                        {
                            title: 'Leave',
                            link: 'restricted.leave'
                        },
                            {
                            title: 'Empolyee Data',
                            link: 'restricted.EmployeesData'
                        },
                        // {
                        //     title: 'Trainee Form',           
                        //     link: 'restricted.Trainee'
                        // },
                        {
                            title: 'Trainee Datatable',           
                            link: 'restricted.traineedata'
                        }
                    ]
                },
                // {
                //     id: 2,
                //     title: 'Employees',
                //     icon: 'people',
                //     submenu: [
                //         {
                //             title: 'Empolyee Data',
                //             link: 'restricted.EmployeesData'
                //         }
                //         // {
                //         //     title: 'Employees Profile',
                //         //     link: 'restricted.employee_view'
                //         // },
                //         // {
                //         //     title: 'Leave Application',
                //         //     link: 'restricted.Leave_Applications'
                //         // }
                //         // {
                //         //     title: 'Employees datatable',
                //         //     link: 'restricted.Employees'
                //         // },
                //         // {
                //         //     title: 'Employee Register',
                //         //     link: 'restricted.register'
                //         // },
                //         // {
                //         //     title: 'Employee Edit',
                //         //     link: 'restricted.employee_edit'
                //         // }
                       
                //     ]
                // },
                 {
                    id: 3,
                    title: 'Attendance',
                    icon: 'timer',
                    submenu: [
                        {
                            title: 'Monitor Attendance',
                            link: 'restricted.Timecalci'
                        },
                        {
                            title: 'Today Attendance Data',
                            link: 'restricted.attendance_data'
                        },
                        {
                            title: 'Attendance Report',
                            link: 'restricted.attendance_report'
                        },
                        {
                            title: 'Manual Attendance',
                            link: 'restricted.manual_attendance'
                        },
                        // {
                        //     title: 'Timer Data Table',
                        //     link: 'restricted.timer_data'
                        // },
                    ]
                },
                {
                    id: 4,
                    title: 'Projects',
                    icon: 'assessment',
                    submenu: [
                        {
                            title: 'List Of Projects',
                            link: 'restricted.projects'
                        }
                    ]
                },
                {
                    id: 5,
                    title: 'Tasks',
                    icon: 'event_available',
                    submenu: [
                        {
                            title: 'List Of Tasks',
                            link: 'restricted.Taskreports'
                        }
                    ]
                },
                {
                    id: 6,
                    title: 'Salary Payroll',
                    icon: 'monetization_on',
                    submenu: [
                        {
                            title: 'Salary Reports',
                            link: 'restricted.Payroll.salary'
                        },
                        {
                            title: 'Payroll Reports',
                            link: 'restricted.Payroll.advancedsalary'
                        }
                    ]
                },
                {
                    id: 7,
                    title: 'Holidays',
                    icon: 'calendar_today',
                    link: 'restricted.calendar'
                },
                 {
                    id: 8,
                    title: 'Master',
                    icon: 'settings_applications',
                    submenu: [
                        {
                            title: 'Position',
                            link: 'restricted.position'
                        },
                        // {
                        //     title: 'Payroll Reports',
                        //     link: 'restricted.Payroll.advancedsalary'
                        // }
                    ]
                }
   ]
    
        }

//For Empolyee

        else if(data1[0].Position == 'Empolyee'){
                        $scope.sections = [{
                    id: 1,
                    title: 'Dashboard',
                    icon: 'dashboard',
                    link: 'restricted.dashboard'
                },
                // {
                //     id: 1,
                //     title: 'Admin',
                //     icon: 'person',
                //     submenu: [{
                //             title: 'Job Details',
                //             link: 'restricted.Jobdetails'
                //         },
                //         {
                //             title: 'users',
                //             link: 'restricted.user'
                //         },
                //         {
                //             title: 'Leave',
                //             link: 'restricted.leave'
                //         },
                //             {
                //             title: 'Empolyee Data',
                //             link: 'restricted.EmployeesData'
                //         },
                //         // {
                //         //     title: 'Trainee Form',           
                //         //     link: 'restricted.Trainee'
                //         // },
                //         {
                //             title: 'Trainee Datatable',           
                //             link: 'restricted.traineedata'
                //         }
                //     ]
                // },
                {
                    id: 2,
                    title: 'Employees',
                    icon: 'people',
                    submenu: [
                        // {
                        //     title: 'Empolyee Data',
                        //     link: 'restricted.EmployeesData'
                        // },
                        {
                            title: 'Employees Profile',
                            link: 'restricted.employee_view'
                        },
                        // {
                        //     title: 'Leave Application',
                        //     link: 'restricted.Leave_Applications'
                        // },
                         {
                            title: 'Employee Leave Table',
                            link: 'restricted.Employeeleavetable'
                        }

                        // {
                        //     title: 'Employees datatable',
                        //     link: 'restricted.Employees'
                        // },
                        // {
                        //     title: 'Employee Register',
                        //     link: 'restricted.register'
                        // },
                        // {
                        //     title: 'Employee Edit',
                        //     link: 'restricted.employee_edit'
                        // }
                       
                    ]
                },
                 {
                    id: 3,
                    title: 'Monitor Attendance',
                    icon: 'timer',
                    link: 'restricted.Timecalci',
                },
                {
                    id: 4,
                    title: 'Projects',
                    icon: 'assessment',
                    submenu: [
                        {
                            title: 'List Of Projects',
                            link: 'restricted.ProjectsEmp'
                        }
                    ]
                },
                {
                    id: 5,
                    title: 'Tasks',
                    icon: 'event_available',
                    submenu: [
                        {
                            title: 'List Of Tasks',
                            link: 'restricted.TaskreportsEmp'
                        }
                    ]
                },
                // {
                //     id: 6,
                //     title: 'Salary Payroll',
                //     icon: 'monetization_on',
                //     submenu: [
                //         {
                //             title: 'Salary Reports',
                //             link: 'restricted.Payroll.salary'
                //         },
                //         {
                //             title: 'Payroll Reports',
                //             link: 'restricted.Payroll.advancedsalary'
                //         }
                //     ]
                // },
                {
                    id: 7,
                    title: 'Holidays',
                    icon: 'calendar_today',
                    link: 'restricted.calendar'
                },
                 {
                    id: 8,
                    title: 'Master',
                    icon: 'settings_applications',
                    submenu: [
                        {
                            title: 'Position',
                            link: 'restricted.position'
                        },
                        // {
                        //     title: 'Payroll Reports',
                        //     link: 'restricted.Payroll.advancedsalary'
                        // }
                    ]
                }
   ]
        }
        }
    ]);