angular
    .module('hrmsApp', [angularDragula(angular)])
    .controller('taskCtrlEmp', [
        '$rootScope',
        '$state',
        '$scope',
        'tasks_list',
        '$toast',
        '$http',
        'dragulaService',
        function($rootScope,$state, $scope, tasks_list,$toast,$http,dragulaService) {

            var $formValidate = $('#form_validation');

            // $('.dropify').dropify();

            // $('.dropify-fr').dropify({
            //     messages: {
            //         default: 'Glissez-déposez un fichier ici ou cliquez',
            //         replace: 'Glissez-déposez un fichier ou cliquez pour remplacer',
            //         remove:  'Supprimer',
            //         error:   'Désolé, le fichier trop volumineux'
            //     }
            // });

            $rootScope.page_full_height = true;

            $scope.$on('$destroy', function() {
                $rootScope.page_full_height = false;
            });

            $scope.$on('onLastRepeat', function(scope, element, attrs) {
                // set width for scrum board container
                var $scrumBoard = $('#scrum_board'),
                    childWidth = $scrumBoard.children('div').width(),
                    childsCount = $scrumBoard.children('div').length;

                $scrumBoard.width(childWidth * childsCount);
            });

            $scope.task_groups = [{
                    id: 'todo',
                    name: 'To Do'
                },
                /*{
                    id: 'inAnalysis',
                    name: 'In analysis'
                },*/
                {
                    id: 'inProgress',
                    name: 'In progress'
                },
                {
                    id: 'done',
                    name: 'Done'
                }
            ];

            $scope.tasks_list = tasks_list;

            $scope.tasks_common = [{
                    "id": 0,
                    "name": "Altair-366",
                    "title": "Et voluptatem ea vel.",
                    "description": "Aut unde id perferendis distinctio alias omnis iusto.",
                    "status": "critical",
                    "assignee": "Dangelo Purdy"
                },
                {
                    "id": 1,
                    "name": "Altair-532",
                    "title": "Exercitationem placeat qui numquam.",
                    "description": "Sit voluptatum officia consequatur architecto quos explicabo.",
                    "status": "minor",
                    "assignee": "Brooks Dickens"
                },
                {
                    "id": 2,
                    "name": "Altair-8235",
                    "title": "Odit sit possimus.",
                    "description": "Laboriosam aut quasi ipsam harum ex animi.",
                    "status": "blocker",
                    "assignee": "Leone Bode"
                },
                {
                    "id": 3,
                    "name": "Altair-2548",
                    "title": "Qui aliquid dicta possimus.",
                    "description": "Nihil rerum ipsum et animi occaecati harum provident quia.",
                    "status": "minor",
                    "assignee": "Jana DuBuque"
                }
            ];

            // task info
            // $scope.taskInfo = function(task) {
            //     $scope.info = {
            //         name: task.name,
            //         title: task.title,
            //         status: task.status,
            //         description: task.description,
            //         assignee: task.assignee
            //     }
            // };

            // // new task
            // $scope.newTask = {
            //     name: 'Tasks',
            //     assignee: [
            //         { id: 1, title: 'Aleen Grant' },
            //         { id: 2, title: 'Tyrese Koss' },
            //         { id: 3, title: 'Chasity Green' },
            //         { id: 4, title: 'Me' }
            //     ],
            //     group: [
            //         { name: 'todo', title: 'To Do' },
            //         { name: 'inAnalysis', title: 'In Analysis' },
            //         { name: 'inProgress', title: 'In Progress' },
            //         { name: 'done', title: 'Done' }
            //     ],
            //     project: [
            //         { name: 'todo', title: 'Allied' },
            //         { name: 'inAnalysis', title: 'CLLC' },
            //         { name: 'inProgress', title: 'HMS' },
            //         { name: 'done', title: 'HRMS' }
            //     ]
            // };

            // $scope.newTask_assignee = $scope.newTask.assignee;
            // $scope.newTask_assignee_config = {
            //     create: false,
            //     maxItems: 1,
            //     valueField: 'id',
            //     labelField: 'title',
            //     placeholder: 'Select Assignee...'
            // };
            // $scope.newTask_group = $scope.newTask.group;
            // $scope.newTask_group_config = {
            //     create: false,
            //     maxItems: 1,
            //     valueField: 'name',
            //     labelField: 'title',
            //     placeholder: 'Select Group...'
            // };
            // $scope.newTask_project = $scope.newTask.project;
            // $scope.newTask_project_config = {
            //     create: false,
            //     maxItems: 1,
            //     valueField: 'name',
            //     labelField: 'title',
            //     placeholder: 'Select Group...'
            // };

            $scope.$on('tasks.drop', function(e, el, target, source) {
                console.log(target[0].id);
            });
            //date range
            var $dp_start = $('#uk_dp_start'),
                $dp_end = $('#uk_dp_end');

            var start_date = UIkit.datepicker($dp_start, {
                format: 'DD.MM.YYYY'
            });

            var end_date = UIkit.datepicker($dp_end, {
                format: 'DD.MM.YYYY'
            });

            $dp_start.on('change', function() {
                end_date.options.minDate = $dp_start.val();
            });

            $dp_end.on('change', function() {
                start_date.options.maxDate = $dp_end.val();
            });
            $scope.forms_advanced = {
                "input_error": "Something wrong",
                "input_ok": "All ok",
                "ionslider_1": 23,
                "ionslider_2": {
                    "from": 160,
                    "to": 592
                },
                "ionslider_3": 40,
                "ionslider_4": {
                    "from": 20,
                    "to": 80
                },
                // selectize_planets: ["2", "3"]
            };

            //multiselect
            

           $scope.selectize_1_options = ["CLLC", "Allied", "Rubycampus"];

            $scope.selectize_1_config = {
                plugins: {
                    'tooltip': ''
                },
                create: false,
                maxItems: 1,
                placeholder: 'Select Projects...'
            };

            $scope.selectize_2_options = [];

            $scope.selectize_2_config = {
                plugins: {
                    'tooltip': ''
                },
                valueField: 'employee_id',
                labelField: 'full_name',
                create: false,
                maxItems: 1,
                placeholder: 'Assigned To...'
            };
            $scope.selectize_3_options = ["To Do", "In Progress","Done"];

            $scope.selectize_3_config = {  
                plugins: {
                    'tooltip': ''
                },
                create: false,
                maxItems: 1,
                placeholder: 'Status...'
            };

// Local Storage

            var data = localStorage.getItem('response.data');
            var data1 = JSON.parse(data);
            var EmpId = data1[0].EmployeeId;
            console.log(EmpId,"Projects Assignee_Empolyee");

// Get Selected Empolyee

            
           $scope.getallData1 = function(EmpId){
                // console.log(EmpId,"tamil");
                var postdata = {'empid':EmpId};
            $http({
                        method: 'POST',
                        url: $rootScope.$siteUrl+'EmpTask',
                        data:postdata
                    }).then(function(response){
                        $scope.get_task=response.data;
                        // splitData($scope.get_task);
                        console.log(response,"get")
                        console.log($scope.get_task,"Emptask");
                    })
            }
            
            $scope.getallData1(EmpId);

            $scope.img_path = 'upload/task/';

            $scope.taskInfo = function(getdata){
                // console.log(getdata.id);
                var id = getdata.id;
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl+'task_add/'+ id,
                    headers:{
                        'Authorization': 'Bearer ' + $scope.Token
                    }
                }).then(function(response){
                    $scope.add_task = response.data;
                    console.log($scope.view_task);

                    $scope.img = response.data.img;
                    console.log($scope.img,"$scope.img")
                    var drEvent = $('#input-file-a').dropify();
                    // drEvent = drEvent.data('dropify');
                    drEvent = drEvent.data('dropify');
                    drEvent.resetPreview();
                    drEvent.clearElement();
                    drEvent.settings.defaultFile = "upload/task/" + $scope.img;
                    drEvent.destroy();
                    drEvent.init();

                });
            }

            // $scope.task_edit = function(data){
            //     var id = data.id;
            //     console.log(id);
            //     return(id);

            // }

    //         $scope.delete = function(id, index) {
    //     // alert(id);
    //   if (id) {
    //     UIkit.modal.confirm(
    //       "Are you sure to delete ?",
    //       function(e) {
    //         if (id) {
    //           $http({
    //             method: "DELETE",
    //             url: $rootScope.$siteUrl+'task_delete/'+ id,
    //             // params: { id: id }
    //           }).then(function(result) {
    //             console.log(result ,"Mohana");
    //               UIkit.notify({
    //                 message: result.data,
    //                 status: "success",
    //                 timeout: 2000,
    //                 pos: "top-center"
    //               });
    //               $scope.getallData();
    //           });
    //         }
    //       },
    //       function() {
    //         //console.log("false");
    //       },
    //       {
    //         labels: {
    //           Ok: "Ok"
    //         }
    //       }
    //     );
    //   }
    // };

    $scope.EmpName = function(){
                    $http({
                            method: 'get',
                            url: $rootScope.$siteUrl+'SelectEmp'

                        }).then(function(response){

                            $scope.selectize_2_options=response.data;
                            console.log($scope.selectize_2_options,"EmpTaskSelectize");
                        })
                }
                $scope.EmpName();
            
            

        }
    ]);