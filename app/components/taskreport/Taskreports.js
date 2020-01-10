angular
    .module('hrmsApp', [angularDragula(angular)])
    .controller('taskCtrl', [
        '$rootScope',
        '$state',
        '$scope',
        'tasks_list',
        '$toast',
        '$http',
        'dragulaService',
        function($rootScope,$state, $scope, tasks_list,$toast,$http,dragulaService) {

            // var $formValidate = $('#form_validation');

            $('.dropify').dropify();

            $('.dropify-fr').dropify({
                messages: {
                    default: 'Glissez-déposez un fichier ici ou cliquez',
                    replace: 'Glissez-déposez un fichier ou cliquez pour remplacer',
                    remove:  'Supprimer',
                    error:   'Désolé, le fichier trop volumineux'
                }
            });

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

            $scope.save = function(postdata){
                var id = postdata.id;
                console.log(postdata,'postdata');
                var formdata = new FormData();
                var img =document.getElementById('input-file-a').files[0];
                console.log(img);
                formdata.append('file',img);
                angular.forEach(postdata,function(value,key){
                    formdata.append(key,value);
                });
                $(".http_preloader").show();
                if(id != null){
                    $http({
                    method: 'post',
                    url: $rootScope.$siteUrl+'task_update/'+id,
                    headers:{"Content-Type":undefined},
                    data:formdata
                }).then(function success(response) {
                    console.log(response,'response');
                    UIkit.modal('#new_task').hide();
                    $scope.clear();
                    $scope.getallData();  
                    $toast(response.data,'success');
                   
                    $(".http_preloader").hide();                    
                });
                }else{
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl+'task_add',
                    headers:{"Content-Type":undefined},
                    data:formdata
                }).then(function success(response) {
                    console.log(response,'response');
                    UIkit.modal('#new_task').hide();
                    $scope.clear();
                    $scope.getallData();  
                    $toast(response.data,'success');
                   
                    $(".http_preloader").hide();                    
                });
                }
            }

            $scope.getallData = function(){
                $(".http_preloader").show(); 
                $http({
                        method: 'get',
                        url: $rootScope.$siteUrl+'task_add'

                    }).then(function(response){
                        $scope.get_task = response.data;
                        $(".http_preloader").hide(); 
                    })
            }
            $scope.getallData();

            $scope.img_path = 'upload/task/';

            $scope.taskInfo = function(getdata){
                console.log(getdata.id);
                var id = getdata.id;
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl+'info_task/'+ id
                    // headers:{
                    //     'Authorization': 'Bearer ' + $scope.Token
                    // }
                }).then(function(response){
                    $scope.add_task = response.data[0];
                    console.log(response.data[0],'response data');

                    $scope.img = $scope.add_task.img;
                    console.log($scope.img,"$scope.img")
                    var drEvent = $('#input-file-a').dropify();
                    // drEvent = drEvent.data('dropify');
                    drEvent = drEvent.data('dropify');
                    drEvent.resetPreview();
                    drEvent.clearElement();
                    drEvent.settings.defaultFile = "upload/task/" + $scope.img;
                    drEvent.destroy();
                    drEvent.init();

                    angular.forEach(response, function(value, key) {
                        if (value.MeetingDate) {
                            value.MeetingDate = MonthLetterFilter(value.MeetingDate);
                        }
                    });

                    

                });
            }

            $scope.Info = function(getdata){
                console.log(getdata.id);
                var id = getdata.id;
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl+'info_task/'+ id
                    // headers:{
                    //     'Authorization': 'Bearer ' + $scope.Token
                    // }
                }).then(function(response){
                    $scope.add_task = response.data[0];
                    console.log(response.data[0],'response data');

                    $scope.img = $scope.add_task.img;
                    console.log($scope.img,"$scope.img")
                    var drEvent = $('#input-file-b').dropify();
                    // drEvent = drEvent.data('dropify');
                    drEvent = drEvent.data('dropify');
                    drEvent.resetPreview();
                    drEvent.clearElement();
                    drEvent.settings.defaultFile = "upload/task/" + $scope.img;
                    drEvent.destroy();
                    drEvent.init();

                    angular.forEach(response, function(value, key) {
                        if (value.MeetingDate) {
                            value.MeetingDate = MonthLetterFilter(value.MeetingDate);
                        }
                    });

                    

                });
            }
            // $scope.task_edit = function(data){
            //     var id = data.id;
            //     console.log(id);
            //     return(id);

            // }

    $scope.delete = function(id, index) {
        // alert(id);
      if (id) {
        UIkit.modal.confirm(
          "Are you sure to delete ?",
          function(e) {
            if (id) {
              $http({
                method: "DELETE",
                url: $rootScope.$siteUrl+'task_delete/'+ id,
                // params: { id: id }
              }).then(function(result) {
                console.log(result ,"Mohana");
                  UIkit.notify({
                    message: result.data,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center"
                  });
                  $scope.getallData();
              });
            }
          },
          function() {
            //console.log("false");
          },
          {
            labels: {
              Ok: "Ok"
            }
          }
        );
      }
    };

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

    $scope.clear = function(){
        $scope.add_task = {};
        var drEvent = $('#input-file-a').dropify();
        drEvent = drEvent.data('dropify');
        drEvent.resetPreview();
        $.each($('#new_task').find('.md-input-wrapper'), function (idex, val) {
            $(val).removeClass('md-input-filled')
        });
    }
            
            

        }
    ]);