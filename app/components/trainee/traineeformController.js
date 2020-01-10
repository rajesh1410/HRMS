angular
    .module('hrmsApp')
    .controller('TraineeCtrl', [
        '$scope',
        '$rootScope',
        '$timeout',
        '$http',
        '$toast',
        '$state',
        '$stateParams',
        function ($scope,$rootScope,$timeout,$http,$toast,$state,$stateParams) {

            //var $formValidate = $('#form_validation');

            $scope.selectize_val_course = [
                { value: 'Testing', label: 'Testing' },
                { value: 'Java', label: 'Java' },
                { value: 'Angular js', label: 'Angular js' },
                { value: 'Angular', label: 'Angular' },
                { value: 'JavaScript', label: 'JavaScript' },
                { value: '.Net', label: '.Net' }
            ];

            $scope.selectize_course = {
                maxItems: 1,
                valueField: 'value',
                labelField: 'label',
                create: false,
                placeholder: 'Course...'
            };

            $scope.selectize_val_options1 = [
              { value: '2 Month', label: '2 Month' },
              { value: '3 Month', label: '3 Month' },
              { value: '6 Month', label: '6 Month' }
             
          ];

          $scope.selectize_val_config1 = {
              maxItems: 1,
              valueField: 'value',
              labelField: 'label',
              create: false,
              placeholder: 'Course durations...'
          };

//Check Mobile Number

          $scope.CheckNumber = function() {
            if (isNaN(event.key) || event.key === ' ' || event.key === '') {
                event.returnValue = '';
            }
        };

                  var id = $stateParams.Id;
                    console.log(id,"aaaaaa");


//Post Trainee Data and Update Trainee Data 

         $scope.postRecive = function (postdata) {
             if (id == null) {
                console.log(postdata,"postdata")
                    $(".http_preloader").show();
                $http({
                    method: 'post',
                    url: $rootScope.$siteUrl+'Trainee',
                    data:postdata
                })
                .then(function success(response) {
                    $scope.data=response.data;
                    localStorage.setItem('Traineename',$scope.data);
                    $scope.data.Remain=$scope.data.Total_fees-$scope.data.paid_amount;
                    console.log($scope.data.Remain,'check');
                    $scope.Details={};
                    $state.go("restricted.traineedata");
                    $toast("Trainee Data Added Successfully",'success');
                    $(".http_preloader").hide();                       
                });
             }
//Update Trainee Data
             else{
                $(".http_preloader").show();
                $http({
                    method:'post',
                    url:$rootScope.$siteUrl+'update/'+id,
                    data:postdata
                }).then(function success(response){
                    $scope.data=response.data
                    console.log($scope.data,"update");
                    $scope.Details={};
                    $state.go("restricted.traineedata");
                    $toast("Trainee Data Updated Successfully",'success');
                    $(".http_preloader").hide();
                });
                
             }
            }

// Fees Calculation

            $scope.FeesCal =function(postdata){
                $scope.data=postdata;
                $scope.data.Remain=$scope.data.Total_fees-$scope.data.paid_amount;
                $scope.Details.Remaining_amount=$scope.data.Remain;
                console.log($scope.data.Remain,"FeesCal");
            }

// Form Validation

            
            $scope.edit = function(number){
                console.log(number,"EditCheck");
                $http({
                    method:'get',
                     url:$rootScope.$siteUrl+'edit/'+number,
                }).then(function(response){
                        $scope.Details = response.data;
                        console.log($scope.Details,"Edit")
                    })
            };

            if(id){
                $scope.edit(id);
            }

            // $timeout(function() {
            //     $formValidate
            //         .parsley({
            //             'excluded': 'input[type=button], input[role=button], input[type=submit], input[type=reset], input[type=hidden], .selectize-input > input, .md-input.selectized'
            //         })
            //         .on('form:validated',function() {
            //             $scope.$apply();
            //         })
            //         .on('field:validated',function(parsleyField) {
            //             if($(parsleyField.$element).hasClass('md-input') || $(parsleyField.$element).is('select')) {
            //                 $scope.$apply();
            //             }
            //         });
            // });

// datepicker callback

            // $('#val_birth').on('hide.uk.datepicker', function() {
            //     $formValidate.parsley().validate();
            // });

            // $scope.people = [
            //     { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
            //     { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
            //     { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
            //     { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
            //     { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
            //     { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
            //     { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
            //     { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
            //     { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
            //     { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
            // ];
            // $scope.person = {};
            // $scope.person.selected = '';

        }
    ]);