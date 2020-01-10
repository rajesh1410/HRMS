angular
    .module('hrmsApp')
    .controller('dt_default', [
        '$scope',
        '$rootScope',
        '$timeout',
        function($scope, $rootScope, $timeout) {

            // Advanced selects

            $scope.users = [{
                    "empid": "CL001",
                    "employee_name": "Suresh",
                    "doj": "01/01/2000",
                    "present": "25",
                    "absent": "1",
                    "Work_Hours": "200",
                    "Hour_Utilized": "180",
                    "Lagged_Hours": "20",


                },
                {
                    "empid": "CL002",
                    "employee_name": "Karthi",
                    "doj": "01/01/2000",
                    "present": "24",
                    "absent": "2",
                    "Work_Hours": "200",
                    "Hour_Utilized": "190",
                    "Lagged_Hours": "10",


                },
                {
                    "empid": "CL003",
                    "employee_name": "Joseph",
                    "doj": "01/01/2000",
                    "present": "20",
                    "absent": "5",
                    "Work_Hours": "200",
                    "Hour_Utilized": "150",
                    "Lagged_Hours": "50",


                },


            ];


            $scope.edit = function($event, index) {
                $event.preventDefault();
                $scope.entity = $scope.users[index];
                $scope.entity.index = index;
                $scope.entity.editable = true;
            };

            $scope.delete = function($event, index, userIndex) {
                $event.preventDefault();
                UIkit.modal.confirm('Remove this row (id:' + userIndex + ')?', function() {
                    $scope.users.splice(index, 1);
                });
            };

            $scope.save = function($event, index) {
                $event.preventDefault();
                $scope.users[index].editable = false;

            };

            $scope.add = function($event) {
                $event.preventDefault();
                $scope.users.push({
                    index: $scope.users.length,
                    name: {
                        first: '',
                        last: ''
                    },
                    age: '',
                    email: '',
                    phone: '',
                    balance: '0.00',
                    company: '',
                    editable: true
                });
            };
            $scope.langSwitcherModel1 = 'Select Id...';
            var langData = $scope.langSwitcherOptions1 = [
                { id: 1, title: 'CL001', value: 'EmpId' },
                { id: 2, title: 'CL002', value: 'EmpIds' },

            ];
            $scope.langSwitcherConfig1 = {
                maxItems: 1,
                render: {
                    option: function(langData, escape) {
                        return '<div class="option">' +
                            '<li>' + escape(langData.title) + '</li>' +
                            '</div>';
                    },
                    // item: function(langData, escape) {
                    //     return '<div class="item"><i' + escape(langData.value).toUpperCase() + '"></i></div>';
                    // }
                },
                valueField: 'value',
                labelField: 'title',
                searchField: 'title',
                create: false,
                onInitialize: function(selectize) {
                    $('#lang_switcher').next().children('.selectize-input').find('input').attr('readonly', true);
                }
            };


        }
    ]);