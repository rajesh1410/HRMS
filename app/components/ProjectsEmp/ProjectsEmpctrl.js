angular
    .module('hrmsApp')
    .controller('contact_list_horizontalCtrl2', [
        '$rootScope',
        '$scope',
        '$window',
        '$http',
        '$toast',
        '$state',
        '$stateParams',
        function ($rootScope,$scope,$window,$http,$toast,$state,$stateParams) {

// Post the data to the DB(save and update)

 var data = localStorage.getItem('response.data');
            var data1 = JSON.parse(data);
            var EmployeeId =  data1[0].EmployeeId;
            console.log(EmployeeId,"Projects Assignee_Empolyee");



// Get Data form DB


var EmpId = data1[0].EmployeeId;
            // console.log(EmpId,"Employee Id deatil");

        $scope.image = "images/";
            $scope.getallData1 = function(EmpId){
                // console.log(EmpId,"tamil");
                var postdata = {'empid':EmpId};
            $http({
                        method: 'POST',
                        url: $rootScope.$siteUrl+'Empproject',
                        data:postdata
                    }).then(function(response){
                        $scope.contact_list=response.data;
                        splitData($scope.contact_list);
                        console.log(response,"get")
                        console.log($scope.contact_list,"first");
                    })
            }
            
            $scope.getallData1(EmpId);
                 
            //      $scope.image = "images/";
            //     $scope.getallData = function(){
            //         //console.log(user,"get")
            //     $http({
            //             method: 'get',
            //             url: 'http://127.0.0.1:8000/api/project',
            //         }).then(function(response){

            //             $scope.contact_list=response.data;
            //             splitData($scope.contact_list);
            //             console.log(response,"get")
            //             console.log($scope.contact_list,"first");
            //         })
            // }
            // $scope.getallData();



            function splitData(data){
                    var all_companies = data.map(function(a){
                        return a.Status;
                })
                

                function eliminateDuplicate(arr){
                    var i,
                    len=arr.length,
                     out=[],
                    obj={};

               for (i=0;i<len;i++) {
                     obj[arr[i]]=0;
                 }
                 for (i in obj) {
                     out.push(i);

                 }
                 return out;
                }
                $scope.contact_list_companies = eliminateDuplicate(all_companies);

                $scope.$on('onLastRepeat', function (scope, element, attrs) {
                $scope.$apply(function () {
                    UIkit.grid($('#contact_list_horizontal'),{
                        controls: '#contact_list_filter',
                        gutter: 20
                    });
                });
            })                
            }
                

            //Add new dropdown
             $scope.newTask = {
                name: 'Add New Project',
                // AssigneeEmpolyees: [
                //     { id: 1, title: 'Mahesh' },
                //     { id: 2, title: 'Rajesh Kumar' },
                //     { id: 3, title: 'Arul Jothi' },
                //     { id: 4, title: 'Giri' }
                // ],
                Status: [
                    { name: 'InProgress', title: 'InProgress' },
                    { name: 'Completed', title: 'Completed' },
                    { name: 'Waiting List', title: 'Waiting List' },
                    // { name: 'done', title: 'Done' }
                ]
            };
         // $scope.newTask_AssigneeEmpolyees =  $scope.newTask.AssigneeEmpolyees;
         //    $scope.newTask_AssigneeEmpolyees_config = {
         //        create:false,
         //        maxItems: 1,
         //        valueField: 'id',
         //        labelField: 'title',
         //        placeholder: 'Select Assignee...'
         //    };
            $scope.newTask_Status =  $scope.newTask.Status;
            $scope.newTask_Status_config =  {
                create:false,
                maxItems: 1,
                valueField: 'name',
                labelField: 'title',
                placeholder: 'Select Status...'
            };
            //end

            //Date
            var $dp_start = $('#uk_dp_start'),
                $dp_end = $('#uk_dp_end');

            var start_date = UIkit.datepicker($dp_start, {
                format:'DD.MM.YYYY'
            });

            var end_date = UIkit.datepicker($dp_end, {
                format:'DD.MM.YYYY'
            });

            $dp_start.on('change',function() {
                end_date.options.minDate = $dp_start.val();
            });

            $dp_end.on('change',function() {
                start_date.options.maxDate = $dp_end.val();
            });
            //Date end

            //Image Upload
            // $('.dropify').dropify();

            // $('.dropify-fr').dropify({
            //     messages: {
            //         default: 'Glissez-déposez un fichier ici ou cliquez',
            //         replace: 'Glissez-déposez un fichier ou cliquez pour remplacer',
            //         remove:  'Supprimer',
            //         error:   'Désolé, le fichier trop volumineux'
            //     }
            // });
            //End

            $scope.AssEmp=function(){
                $http({
                    method:'GET',
                    url: $rootScope.$siteUrl+'SelectEmp'
                }).then(function(response){

                    $scope.selectize_single_options=response.data;
                    console.log($scope.selectize_single_options,"AssEmp");
                })
            }
            $scope.AssEmp();

            $scope.selectize_single_options = [];

            $scope.selectize_single_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                maxItems: null,
                valueField: 'employee_id',
                labelField: 'full_name',
                searchField: 'name',
                create: false,
                placeholder: "Select Assignee...",
                // optgroups: [
                //     {value: 'atz', label: 'Alaskan/Hawaiian Time Zone'},
                //     {value: 'ptz', label: 'Pacific Time Zone'},
                //     {value: 'mtz', label: 'Mountain Time Zone'}
                // ],
                render: {
                    optgroup_header: function(data, escape) {
                        return '<div class="optgroup-header">' + escape(data.label) + '</div>';
                    }
                }
            };

        }
   
    ]);

  