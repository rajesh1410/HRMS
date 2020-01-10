angular
    .module('hrmsApp')
    .controller('employee_editCtrl', [
        '$scope',
        '$http',
        '$toast',
        function ($scope,$http,$toast) {

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

//position
  $scope.Users = function (postdata) {


                postdata.Skils = postdata.Skills.join();
               postdata.Education_Deatil = postdata.EducationDeatil.join();
            var valueget = document.getElementById('FilleName').files[0].name;
               // $fileinput = valueget;
               // formdata.append('file',$fileinput);
              postdata.FilleName = valueget;
                console.log(postdata,"postdata")
                  // $(".http_preloader").show();
                $http({
                    method: 'POST',
                    url:'http://127.0.0.1:8000/api/EmpolyeeReg',
                    data:postdata
                })

                .then(function success(response) {
                    console.log(response,'response');

                $scope.reg={};
                
                    $toast(response.data,'success');             
                    $(".http_preloader").hide();                       
                    
                })


            }

            $scope.selectize_position_options = [
                {id: 1, name: 'Developer', value: 'Developer'},
                {id: 2, name: 'Marketing Executive', value: 'Marketing Executive'},
                {id: 3, name: 'Trainee', value: 'Trainee'},
                {id: 4, name: 'HR', value: 'HR'},
                {id: 5, name: 'Testing', value: 'Testing'},
            ];

            $scope.selectize_position_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                maxItems: 1,
                valueField: 'value',
                labelField: 'name',
                searchField: 'name',
                create: false,
                placeholder: "Select  Position...",
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


            $scope.selectize_position_options = [
                {id: 1, name: 'Developer', value: 'Developer'},
                {id: 2, name: 'Marketing Executive', value: 'Marketing Executive'},
                {id: 3, name: 'Trainee', value: 'Trainee'},
                {id: 4, name: 'HR', value: 'HR'},
                {id: 5, name: 'Testing', value: 'Testing'},
            ];


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



 //            $scope.reg = {
 //                id: 1,
 //                full_name: 'Rajeshkumar',
 //                family_name: 'Aravindhan',
 //                gender:'male',
 //                date_of_birth: '16.07.1994',
 //                date_of_joining: '08.07.2019',
 //                position: 'Developer',
 //                email_id: 'rajesh@gmail.com',
 //                phone_number: '123456789',
 //                official_email_id: 'rajesh@cloudlogic.in',
 //                education_details: 'BE',
 //                skils: 'PHP',
 //                image: 'assets/img/gallery/ap1_2615.jpg',
 //                street_name: 'nadu street',
 //                city_town: 'vandavasi',
 //                district: 'Thiruvannamalai',
 //                pincode: '604408',
 //                account_number: '1234567',
 //                ifsc_code: '8765432',
 //                bank_name: 'SBI',
 //                branch_name: 'Royapettah',
 // };




        }
    ]);