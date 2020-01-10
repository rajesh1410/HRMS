angular
    .module('hrmsApp')
    .controller('main_sidebarCtrl', [
        '$timeout',
        '$scope',
        '$rootScope',
        '$state',

        function ($timeout, $scope, $rootScope, $state) {
            $scope.$state = $state;

            $scope.$on('onLastRepeat', function (scope, element, attrs) {
                $timeout(function () {
                    if (!$rootScope.miniSidebarActive) {
                        // activate current section
                        $('#sidebar_main').find('.current_section > a').trigger('click');
                    } else {
                        // add tooltips to mini sidebar
                        var tooltip_elem = $('#sidebar_main').find('.menu_tooltip');
                        tooltip_elem.each(function () {
                            var $this = $(this);

                            $this.attr('title', $this.find('.menu_title').text());
                            UIkit.tooltip($this, {
                                pos: 'right'
                            });
                        });
                    }
                })
            });

            // language switcher
            $scope.langSwitcherModel = 'gb';
            var langData = $scope.langSwitcherOptions = [{
                    id: 1,
                    title: 'English',
                    value: 'gb'
                },
                {
                    id: 2,
                    title: 'French',
                    value: 'fr'
                },
                {
                    id: 3,
                    title: 'Chinese',
                    value: 'cn'
                },
                {
                    id: 4,
                    title: 'Dutch',
                    value: 'nl'
                },
                {
                    id: 5,
                    title: 'Italian',
                    value: 'it'
                },
                {
                    id: 6,
                    title: 'Spanish',
                    value: 'es'
                },
                {
                    id: 7,
                    title: 'German',
                    value: 'de'
                },
                {
                    id: 8,
                    title: 'Polish',
                    value: 'pl'
                }
            ];
            $scope.langSwitcherConfig = {
                maxItems: 1,
                render: {
                    option: function (langData, escape) {
                        return '<div class="option">' +
                            '<i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' +
                            '<span>' + escape(langData.title) + '</span>' +
                            '</div>';
                    },
                    item: function (langData, escape) {
                        return '<div class="item"><i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i></div>';
                    }
                },
                valueField: 'value',
                labelField: 'title',
                searchField: 'title',
                create: false,
                onInitialize: function (selectize) {
                    $('#lang_switcher').next().children('.selectize-input').find('input').attr('readonly', true);
                }
            };

            // menu entries
            var admin = [{
                    id: 0,
                    title: 'Dashboard',
                    icon: 'dashboard',
                    link: 'restricted.dashboard'
                },
                {
                    id: 2,
                    title: 'Online Application',
                    icon: 'description',
                    submenu: [{

                            title: 'List of Agents',
                            link: 'restricted.applications.agentList'
                        },
                        {
                            title: 'List of Students',
                            link: 'restricted.applications.studentList'
                        },
                        {
                            title: 'List of Active Students',
                            link: 'restricted.applications.studentGrid'
                        },
                        {
                            title: 'List of Homestay',
                            link: 'restricted.applications.homestayList'
                        },
                        {
                            title: 'Agent Application Profile',
                            link: 'restricted.agentprofile'
                        },
                        {

                            title: 'Agent Application Edit',
                            link: 'restricted.agent'
                        },
                        {
                            title: 'Student Application Profile',
                            link: 'restricted.student.studentprofile'
                        },
                        {
                            title: 'Student  Application Form',
                            link: 'restricted.student.studentview'
                        },
                        {

                            title: 'Homestay Host Application Profile',
                            link: 'restricted.hostprofile'
                        },
                        {

                            title: 'Homestay Host Application Edit',
                            link: 'restricted.host'
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Academics',
                    icon: 'school',
                    submenu: [{
                            title: 'Detailed Student Information',
                            link: 'restricted.student.studentdetailedInfo'
                        },
                        {
                            title: 'Student Notes',
                            link: 'restricted.applications.createStudentNote'
                        },
                        {
                            title: 'Substitute a Class',
                            link: 'restricted.Substitute'
                        },
                        {

                            title: 'Assign a class',
                            link: 'restricted.assignclass'
                        },
                        {
                            title: 'My Hours Report',
                            link: 'restricted.hoursreport'
                        },
                        {
                            title: 'Assign Student Class',
                            link: 'restricted.assignstudentclass'
                        },
                        {

                            title: 'All Class Info',
                            link: 'restricted.allclassinfo'
                        },
                        {
                            title: 'Daily Attendance',
                            link: 'restricted.student.dailyattendence'
                        },
                        {
                            title: 'Update Attendance',
                            link: 'restricted.student.updateattendence'
                        },
                        {
                            title: 'Incompleted Attendance',
                            link: 'restricted.notcompletedlist'
                        },
                        {
                            title: 'Class History',
                            link: 'restricted.student.classhistory'
                        },
                        {
                            title: 'Student Transfer',
                            link: 'restricted.student.studenttransfer'
                        },
                        {
                            title: 'Moveup projector',
                            link: 'restricted.moveupprojector'
                        },
                        {
                            title: 'Assign Student Vacation',
                            link: 'restricted.applications.assignStudentVacation'
                        },
                        {

                            title: 'Graduate From CLLC',
                            link: 'restricted.graduateView'
                        },
                        {
                            title: 'Mark Report',
                            link: 'restricted.markreport'
                        },
                        {

                            title: 'Home Work',
                            link: 'restricted.homework'
                        },
                        {
                            title: 'UPP weekly Assignment',
                            link: 'restricted.weeklyassignment'
                        }
                    ]
                },
                {
                    id: 4,
                    title: 'Director',
                    icon: 'person',
                    submenu: [{
                            title: ' Employee Deduction',
                            link: 'restricted.employeededuction'
                        },
                        {
                            title: 'Initiate Employee',
                            link: 'restricted.initiateempl'
                        },
                        {
                            title: 'Empolyment termination',
                            link: 'restricted.terminateemploye'
                        },
                        {

                            title: 'Letter Of Acceptance',
                            link: 'restricted.letterofacceptance'
                        },
                        {

                            title: 'Change Student Location',
                            link: 'restricted.changeStudentLocation'
                        },
                        {
                            title: 'BooksCurrent Inventory',
                            link: 'restricted.BooksCurrentInventory'
                        },
                        {
                            title: 'Books Inventory',
                            link: 'restricted.BooksInventory'
                        },
                        {
                            title: 'Accounting Over Due',
                            link: 'restricted.accounting'
                        },
                        {
                            title: 'Student LA-Form',
                            link: 'restricted.studentLaForm'
                        },
                        {
                            title: 'School Expenses',
                            link: 'restricted.expensesView',

                        },
                        {
                            title: 'Approve School Expenses',
                            link: 'restricted.expensesApprove',

                        }


                    ]
                },
                {
                    id: 5,
                    title: 'HR',
                    icon: 'contact_mail',
                    submenu: [{
                            title: 'List of Employees',
                            link: 'restricted.employeeList'
                        },
                        {
                            title: 'Employee Profile',
                            link: 'restricted.employeeProfile'
                        },
                        {
                            title: 'Employee Edit',
                            link: 'restricted.employee'
                        },
                        {
                            title: 'Employee Hour',
                            link: 'restricted.emphour'
                        }
                    ]
                },
                {
                    id: 5,
                    title: 'Accounting',
                    icon: 'account_balance_wallet',
                    submenu: [{
                            title: 'Teacher Hour',
                            link: 'restricted.TeacherHour'
                        },
                        {
                            title: 'Employee Hour Report',
                            link: 'restricted.employeereportView'
                        },
                        {
                            title: 'Student Book Assignment',
                            link: 'restricted.student.studentbookassignment'
                        },
                        {
                            title: 'Student Book Purchase',
                            link: 'restricted.student.studentbookpurchase'
                        },
                        {
                            title: 'Collect Cash Report',
                            link: 'restricted.student.collectcashreport'
                        },
                        {
                            title: 'Update an Invoice',
                            link: 'restricted.updates'
                        },
                        {

                            title: 'Invoices Ready To Sent',
                            link: 'restricted.readyinvoice'
                        },
                        {

                            title: 'Agency Commission',
                            link: 'restricted.agencycommission'
                        },
                        {

                            title: 'Agency Payment Out',
                            link: 'restricted.agencypayment'
                        },
                        {

                            title: 'Approve Payment',
                            link: 'restricted.approvepayment'
                        }

                    ]
                },
                {
                    id: 6,
                    title: 'Teacher',
                    icon: 'local_library',
                    submenu: [{

                            title: 'Monthly Comments',
                            link: 'restricted.formclass'
                        },
                        {
                            title: 'Plus One',
                            link: 'restricted.applications.plusOne'
                        },
                        {
                            title: 'Final 45',
                            link: 'restricted.applications.final45'
                        },
                        {

                            title: 'Add Class Comment',
                            link: 'restricted.addclass'
                        },
                        {

                            title: 'Student Mark',
                            link: 'restricted.studentmark'
                        },
                        {
                            title: 'Mark Report with Water Mark',
                            link: 'restricted.waterreport'
                        },
                        {
                            title: 'Move Student',
                            link: 'restricted.movestudent'
                        },
                        {

                            title: 'UPP Marking Scheme',
                            link: 'restricted.markingschemetable'
                        },
                        {
                            title: ' Time Off Form',
                            link: 'restricted.AddTimeOff'
                        },
                        {
                            title: 'Time Off View',
                            link: 'restricted.TimeOfview'
                        },
                        {
                            title: 'Approve TimeOff',
                            link: 'restricted.approvetimeoff'
                        },
                        {
                            title: 'weekly Test',
                            link: 'restricted.applications.weeklyTest'
                        },
                        {
                            title: 'UPP weekly Test',
                            link: 'restricted.uppweeklytest'
                        },
                        {

                            title: 'Update Test',
                            link: 'restricted.updatetest'
                        },
                        {
                            title: 'Moveup Assistant',
                            link: 'restricted.moveup'
                        },
                        {
                            title: 'Excuse student',
                            link: 'restricted.student.studentexcuse'
                        }

                    ]
                },
                {
                    id: 7,
                    title: 'Management',
                    icon: 'layers',
                    submenu: [{
                            title: 'Initial Student Info',
                            link: 'restricted.student.initialstudent'
                        },
                        {
                            title: 'Receive a Payment',
                            link: 'restricted.receive'
                        },
                        {
                            title: 'Payment Receipt',
                            link: 'restricted.receivedocument'
                        },
                        {
                            title: 'Immigration Info',
                            link: 'restricted.immigration'
                        },
                        {

                            title: 'Student Vacation List',
                            link: 'restricted.StudentvacationList'
                        }
                    ]
                },
                {
                    id: 7,
                    title: 'Finance',
                    icon: 'local_atm',
                    submenu: [{

                            title: 'Copy Invoice',
                            link: 'restricted.copyInvoice'
                        },
                        {

                            title: 'Easy Internal Refund or Detailed Student Finance Reports ',
                            link: 'restricted.easyInternalRefund'
                        },
                        {
                            title: 'Invoices Generation',
                            link: 'restricted.invoiceslist'
                        }
                    ]
                },
                {
                    id: 7,
                    title: 'Payroll',
                    icon: 'collections_bookmark',
                    submenu: [{
                        title: 'Payroll',
                        link: 'restricted.payroll'
                    }]
                },
                {
                    id: 8,
                    title: 'Activities',
                    icon: 'device_hub',
                    submenu: [{
                            title: 'Activities',
                            link: 'restricted.activities'
                        },
                        {
                            title: 'Activities Report',
                            link: 'restricted.activitiesreport'
                        },
                        {
                            title: 'Form Activites',
                            link: 'restricted.formactivites'
                        },
                        {
                            title: 'Activity Registration',
                            link: 'restricted.Activityregistration'
                        },
                        {
                            title: 'Multiple Activity Registry',
                            link: 'restricted.multipleActivityRegistry'
                        },
                        {
                            title: 'Medical Insurance Report',
                            link: 'restricted.medicalreport'
                        },

                    ]
                },
                {
                    id: 9,
                    title: 'Homestay',
                    icon: 'home',
                    submenu: [{
                            title: 'Homestay Finance Discrepancy',
                            link: 'restricted.homeStay'
                        },
                        {

                            title: 'Host Expenses',
                            link: 'restricted.hostExpenses'
                        },
                        {
                            title: 'Host People',
                            link: 'restricted.hostpeople'
                        },
                        {

                            title: 'Homestay Request',
                            link: 'restricted.homestayRequest'
                        },
                        {

                            title: 'Homestay Host Information',
                            link: 'restricted.homestayhostinfo'
                        },
                        {

                            title: 'Host Family History',
                            link: 'restricted.hostfamilyhistory'
                        },
                        {

                            title: 'Host Family pet ',
                            link: 'restricted.hostfamilypetclone'
                        },
                        {

                            title: 'medical insurance',
                            link: 'restricted.addmedicalinsurancen'
                        },
                        {

                            title: 'Homestay Family',
                            link: 'restricted.homestayfamily'
                        },
                        {

                            title: 'Host Information',
                            link: 'restricted.hostinformtion'
                        },
                        {

                            title: 'Host Rating',
                            link: 'restricted.hostRating'
                        },
                        {

                            title: 'Rate Host Family',
                            link: 'restricted.ratehost'
                        },
                        {

                            title: 'Home Family Payment',
                            link: 'restricted.hostfamilypayment'
                        },
                        {

                            title: 'Host Family Desc',
                            link: 'restricted.hostFamilyDesc'
                        }

                    ]
                },
                {
                    id: 10,
                    title: 'Marketing',
                    icon: 'business_center',
                    submenu: [{

                            title: 'Agency Credits',
                            link: 'restricted.agencycredit'
                        },
                        {

                            title: 'Apply Agency',
                            link: 'restricted.applyagencycredit'
                        },
                        {
                            title: 'Sales by Country',
                            link: 'restricted.salesbycountry'
                        },
                        {
                            title: 'Selling Agencies Info',
                            link: 'restricted.tableView'
                        }
                    ]
                },
                {
                    id: 12,
                    title: 'Campus Setting',
                    icon: 'person',
                    submenu: [{
                            title: 'List of Classrooms',
                            link: 'restricted.classrooms'
                        },
                        {
                            title: 'List of Classes',
                            link: 'restricted.classes'
                        },
                        {
                            title: 'List of Course Number + Titles',
                            link: 'restricted.courseoption'
                        },
                        {

                            title: 'Book Titles',
                            link: 'restricted.booktitles'
                        },
                        {
                            title: 'Class Time Options',
                            link: 'restricted.classtimeoptions'
                        },
                        // {

                        //     title: 'Budget',
                        //     link: 'restricted.booktitles'
                        // },
                        // {
                        //     title: 'Payment',
                        //     link: 'restricted.budgetFunction'
                        // }
                        // {
                        //     title: 'List of Days off for employees',
                        //     link: ''
                        // },
                        // {
                        //     title: 'List of Holiday options',
                        //     link: ''
                        // },
                        // {

                        //     title: 'Initial list of classes',
                        //     link: ''
                        // }
                    ]
                },
                {
                    id: 11,
                    title: 'incompleted',
                    icon: 'build',
                    submenu: [{

                            title: 'CertificateView',
                            link: 'restricted.CertificateView'
                        },
                        {

                            title: 'homestay pdf',
                            link: 'restricted.homestayhostinfo'
                        },
                        {

                            title: 'mark report with water mark',
                            link: 'restricted.waterreport'
                        },
                        {

                            title: 'mark report',
                            link: 'restricted.markreport'
                        },
                        {

                            title: 'payment receipt',
                            link: 'restricted.receivedocument'
                        },
                        {

                            title: 'LOA',
                            link: 'restricted.loa'
                        },
                        {

                            title: 'Invoice Format',
                            link: 'restricted.invoice'
                        },
                        {

                            title: 'academic transcript',
                            link: 'restricted.academictranscript'
                        },
                        {

                            title: 'academic transcript 2',
                            link: 'restricted.academictranscript2'
                        }

                    ]
                }

            ];
            $scope.sections = admin;

        }
    ]);