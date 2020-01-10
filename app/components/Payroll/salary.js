angular
    .module('hrmsApp')
    .controller('salaryCtrl', [
        '$scope',
        '$timeout',
        function($scope, $timeout) {
            $scope.users1 = [{
                    "date": "23-09-2019",
                    "isActive": true,
                    "employee_name": "rajesh",
                    "type": "leave",
                    "no_of_days": "2",
                    "reason": "fever",
                    "remarks": "kihihij",
                }

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


            $scope.langSwitcherModel2 = 'Select Name...';
            var langData = $scope.langSwitcherOptions2 = [
                { id: 1, title: 'Rajesh', value: 'Name' },
                { id: 2, title: 'Magesh', value: 'Names' }
            ];
            $scope.langSwitcherConfig2 = {
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


            $scope.langSwitcherModel3 = 'Select...';
            var langData = $scope.langSwitcherOptions3 = [
                { id: 1, title: 'Basic', value: 'Basic' },
                { id: 2, title: 'Incentive', value: 'Incentive' }
            ];
            $scope.langSwitcherConfig3 = {
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


            $scope.langSwitcherModel4 = 'Amount...';
            var langData = $scope.langSwitcherOptions4 = [
                { id: 1, title: '5000', value: 'Salary' },
                { id: 2, title: '10000', value: 'Salarys' }
            ];
            $scope.langSwitcherConfig4 = {
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




            $scope.selectize_a_data = {
                options: [{
                        id: 1,
                        title: "Item A1",
                        value: "a1",
                        parent_id: 1
                    },
                    {
                        id: 2,
                        title: "Item B1",
                        value: "b1",
                        parent_id: 1
                    },
                    {
                        id: 3,
                        title: "Item C1 (disabled)",
                        value: "c1",
                        parent_id: 1
                    },
                    {
                        id: 4,
                        title: "Item A2",
                        value: "a2",
                        parent_id: 2
                    },
                    {
                        id: 5,
                        title: "Item B2",
                        value: "b2",
                        parent_id: 2
                    },
                    {
                        id: 6,
                        title: "Item C2 (disabled)",
                        value: "c2",
                        parent_id: 2
                    }
                ]
            };

            $scope.selectize_a_config = {
                plugins: {
                    'disable_options': {
                        disableOptions: ["c1", "c2"]
                    }
                },
                create: false,
                maxItems: 1,
                placeholder: 'Select...',
                optgroups: [
                    { value: 1, label: 'Optgroup 1' },
                    { value: 2, label: 'Optgroup 2' }
                ],
                optgroupField: 'parent_id',
                valueField: 'value',
                labelField: 'title',
                searchField: 'title',
                onInitialize: function(selectize) {
                    selectize.on('change', function() {
                        console.log('on "change" event fired');
                    });
                    selectize.on('focus', function() {
                        console.log('on "focus" event fired');
                    });
                    selectize.on('dropdown_open', function() {
                        console.log('on "dropdown_open" event fired');
                    });
                }
            };
            $scope.users = [{
                    "index": 0,

                    "empname": "Suresh",
                    "category": "Basic",
                    "amount": "5000",

                },
                {
                    "index": 1,
                    "empname": "Joesph",
                    "category": "Incentive",
                    "amount": "10000",
                },
                {
                    "index": 2,
                    "empname": "Karthi",
                    "category": "Basic",
                    "amount": "5000",
                },
                {
                    "index": 3,
                    "empname": "Bala",
                    "category": "Incentive",
                    "amount": "10000",
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


        }
    ]);