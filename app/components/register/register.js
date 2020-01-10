angular
    .module('hrmsApp')
    .controller('registerCtrl', [
        '$scope',
        '$http',
        '$toast',
        '$stateParams',
        '$state',
        '$rootScope',
        function ($scope,$http,$toast,$stateParams,$state,$rootScope) {

            var $formValidate = $('#form_validation');

            $('.dropify').dropify();

            $('.dropify-fr').dropify({
                messages: {
                    default: 'Glissez-déposez un fichier ici ou cliquez',
                    replace: 'Glissez-déposez un fichier ou cliquez pour remplacer',
                    remove:  'Supprimer',
                    error:   'Désolé, le fichier trop volumineux'
                }
            });

//position

            $scope.selectize_position_options = [
                {id: 1, name: 'Developer', value: 'Developer'},
                {id: 2, name: 'Marketing Executive', value: 'Marketing Executive'},
                {id: 3, name: 'Trainee', value: 'Trainee'},
                {id: 4, name: 'HR', value: 'HR'},
                {id: 5, name: 'Testing', value: 'Testing'},
            ];

            $scope.selectize_position_config = {
                plugins: {
                    'tooltip': ''
                },
                maxItems: 1,
                valueField: 'value',
                labelField: 'name',
                searchField: 'name',
                create: false,
                placeholder: "Select  Position...",
                
                render: {
                    optgroup_header: function(data, escape) {
                        return '<div class="optgroup-header">' + escape(data.label) + '</div>';
                    }
                }
            };


            // $scope.selectize_position_options = [
            //     {id: 1, name: 'Developer', value: 'Developer'},
            //     {id: 2, name: 'Marketing Executive', value: 'Marketing Executive'},
            //     {id: 3, name: 'Trainee', value: 'Trainee'},
            //     {id: 4, name: 'HR', value: 'HR'},
            //     {id: 5, name: 'Testing', value: 'Testing'},
            // ];


// education

            $scope.selectize_education_options = [
                {id: 1, name: 'BE', value: 'BE'},
                {id: 2, name: 'Bsc', value: 'Bsc'},
                {id: 3, name: 'Msc', value: 'Msc'},
                {id: 4, name: 'MBA', value: 'MBA'},
                {id: 5, name: 'ME', value: 'ME'},
            ];

            $scope.selectize_education_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                maxItems: null,
                valueField: 'value',
                labelField: 'name',
                searchField: 'name',
                create: false,
                placeholder: "Select  education...",
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



            //skils

                 $scope.selectize_skils_options = [
                {id: 1, name: 'HTML', value: 'HTML'},
                {id: 2, name: 'CSS', value: 'CSS'},
                {id: 3, name: 'JS', value: 'JS'},
                {id: 4, name: 'PHP', value: 'PHP'},
                {id: 5, name: 'Manual testing', value: 'Manual testing'},
                {id: 5, name: 'Selenium', value: 'Selenium'},
            ];

            $scope.selectize_skils_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                maxItems: null,
                valueField: 'value',
                labelField: 'name',
                searchField: 'name',
                create: false,
                placeholder: "Select  skils...",
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

            var id = $stateParams.Id;
 console.log($stateParams)

 $scope.img_path = 'upload/';

 $scope.edit = function(Id) {
    $(".http_preloader").show(); 
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl+'status_edit/' + Id,
                    headers: {
                        'Authorization': 'Bearer ' + $scope.Token
                    }
                }).then(function mySuccess(response) {
                    $(".http_preloader").hide(); 
                    $scope.Register = response.data;
                    
                    if($scope.Register.skils != null){
                        $scope.skills=$scope.Register.skils.split(",");
                        $scope.Register.skills = $scope.skills;
                    }
                    if($scope.Register.education_details != null){
                        $scope.ed_details = $scope.Register.education_details.split(",");
                        $scope.Register.ed_details = $scope.ed_details;
                    }
                    
                    var from_d = $scope.Register.birth.split('-');
                    var to_d = $scope.Register.join.split('-');
                    var FD= from_d[2]+"-"+from_d[1]+"-"+from_d[0];
                    var TD= to_d[2]+"-"+to_d[1]+"-"+to_d[0];
                    $scope.Register.birth = FD;
                    $scope.Register.join = TD;
                   
                    

// if(response.data.img != null){
    $scope.img = response.data.img;
                    var drEvent = $('#input-file-a').dropify();
                    // drEvent = drEvent.data('dropify');
                    drEvent = drEvent.data('dropify');
                    drEvent.resetPreview();
                    drEvent.clearElement();
                    drEvent.settings.defaultFile = "upload/" + $scope.img;
                    drEvent.destroy();
                    drEvent.init();


                    // console.log($scope.Register, 'final object');
                    angular.forEach(response, function(value, key) {
                        if (value.MeetingDate) {
                            value.MeetingDate = MonthLetterFilter(value.MeetingDate);
                        }
                    });
// }

                    angular.forEach($scope.Register, function(value,key){
                        if(value != 'null'){
                            $scope.Register.key = value;
                        }else{
                            delete $scope.Register[key];
                        }
                    })
                    
                });
            }



            if (id) {
                $scope.edit(id);
            }




$scope.save = function (postdata) {
    console.log(postdata,'update data')
               var formdata = new FormData();
                if(postdata.birth != null){
                    var from_d = postdata.birth.split('-');
                    var FD= from_d[2]+"-"+from_d[1]+"-"+from_d[0];
                    postdata.birth = FD;
                }
                if(postdata.join != null){
                    var to_d = postdata.join.split('-');
                    var TD= to_d[2]+"-"+to_d[1]+"-"+to_d[0];
                    postdata.join = TD;
                }
                    

               if(postdata.skills !=null){
                    postdata.skils = postdata.skills.join();
                    formdata.append('skils',postdata.skills);
               }
               if(postdata.ed_details != null){
                    postdata.education_details = postdata.ed_details.join();
                    formdata.append('education_details',postdata.ed_details);
               }

               var valueget = document.getElementById('input-file-a').files[0];
               if(valueget != null){
                    formdata.append('file',valueget);
               }
               
               
    if(postdata !=null){
        if(postdata.employee_id == null ||postdata.email_id==""){
            $scope.postdata = {};
            $toast('Enter Employee Id','danger');        
        }else if(postdata.full_name == null ||postdata.full_name == ""){
            $scope.postdata = {};
            $toast('Enter Name', 'danger');
        }
        else if(postdata.family_name == null || postdata.family_name == ""){
            $scope.postdata = {};
            $toast('Enter Family Name','danger');        
        }
        else if(postdata.gender == null || postdata.gender == ""){
            $scope.postdata = {};
            $toast('Enter Gender', 'danger');
        }
        else if(postdata.birth == null || postdata.birth == ""){
            $scope.postdata = {};
            $toast('Enter Date Of Birth','danger');        
        }
        else if(postdata.join == null || postdata.join == ""){
            $scope.postdata = {};
            $toast('Enter Join Ddate', 'danger');
        }
        else if(postdata.position == null || postdata.position == ""){
            $scope.postdata = {};
            $toast('Enter Position','danger');        
        }
        else if(postdata.email_id == null || postdata.email_id == ""){
            $scope.postdata = {};
            $toast('Enter Email Id', 'danger');
        }
        else if(postdata.phone_number == null || postdata.phone_number == ""){
            $scope.postdata = {};
            $toast('Enter Phone NUmber', 'danger');
            
        }else{
            angular.forEach(postdata, function (value, key) 
                {
                    formdata.append(key, value);
                });
            $(".http_preloader").show();

        if (id != null) {
            $http({
                method: 'post',
                url: $rootScope.$siteUrl+'status_update/'+id,
                headers:{"Content-Type":undefined},
                data:formdata
            })
            .then(function success(response) {
                console.log(response.data,'image data')
                $state.go("restricted.EmployeesData");
                $(".http_preloader").hide(); 
                $toast(response.data,'success');                     
            });
        }else{
            $http({
                method: 'post',
                url: $rootScope.$siteUrl+'status_register',
                headers:{"Content-Type":undefined},
                data:formdata
            })
            .then(function success(response) {
                console.log(response.data,'image data')
                $state.go("restricted.EmployeesData");
                $(".http_preloader").hide();   
                $toast(response.data,'success');                                
            });

        }
        }
     
    }                    
            }


//key board tab function
            $scope.tab = function(postdata){
                $scope.Register.gender = postdata;
            }




        }
    ]);