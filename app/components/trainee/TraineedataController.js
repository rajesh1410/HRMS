angular
    .module('hrmsApp')
    .controller('traineedataCtrl',
        function($compile, $scope, $timeout, $resource, DTOptionsBuilder, DTColumnDefBuilder, $state, $http, $rootScope,$toast) {
  
            // console.log('data', trainee);
            // $scope.Search='';

              var vm = this;
            vm.dtOptions = DTOptionsBuilder
                .newOptions()
                .withDOM("<'dt-uikit-header'<'uk-grid'<'uk-width-medium-2-3'l><'uk-width-medium-1-3'f>>>" +
                    "<'uk-overflow-container'tr>" +
                    "<'dt-uikit-footer'<'uk-grid'<'uk-width-medium-3-10'i><'uk-width-medium-7-10'p>>>")
            .withOption('createdRow', function(row, data, dataIndex) {
                    $compile(angular.element(row).contents())($scope);
                })
                .withOption('headerCallback', function(header) {
                    if (!vm.headerCompiled) {
                        vm.headerCompiled = true;
                        $compile(angular.element(header).contents())($scope);
                    }
                })
                .withPaginationType('full_numbers')
                .withColumnFilter({
                    aoColumns: [

                        null, {
                            type: 'number',
                            bRegex: true,
                            bSmart: true
                        }, {
                            type: 'text',
                            bRegex: true,
                            bSmart: true
                        }, {
                            type: 'text',
                            bRegex: true,
                            bSmart: true
                        }, {
                            type: 'text',
                            bRegex: true,
                            bSmart: true
                        },
                        {
                            type: 'text',
                            bRegex: true,
                            bSmart: true
                        },
                        {
                            type: 'text',
                            bRegex: true,
                            bSmart: true
                        },
                        {
                            type: 'text',
                            bRegex: true,
                            bSmart: true
                        },
                        {
                            type: 'text',
                            bRegex: true,
                            bSmart: true
                        }

                    ]
                })
            .withButtons([

                    {
                        extend: 'excelHtml5',
                        text: '<i class="uk-icon-file-excel-o"></i> XLSX',
                        titleAttr: 'XLSX'
                    },

                    {
                        extend: 'pdfHtml5',
                        text: '<i class="uk-icon-file-pdf-o"></i> PDF',
                        titleAttr: 'PDF'
                    }
                ])
            
//GetAll Trainee Data

          $scope.getallData = function(){
                $http({
                        method: 'get',
                        url: $rootScope.$siteUrl+'Trainee',
                        // trainee:trainees
                    }).then(function(response){

                        $scope.traineesData = response.data;

                    })
             }
         
     $scope.getallData();

// Find Trainee Data

    $scope.Find=function(Search){
        console.log(Search.Traineename,Search.Course,"keerthi");
        $http({
            method:'post',
            url:$rootScope.$siteUrl+'find',
            data:Search
        }).then(function(response){
            $scope.traineesData = response.data;
            $scope.Search={};
        })
    }

//Find Reset

    $scope.Reset = function(Search){
        $scope.traineesData='';
        $scope.Search = {};
        $scope.getallData();    
        console.log($scope.traineesData,"Reset");
    }


//Delete Trainee Data

            $scope.delete = function($event,index,trainee){
                $http({
                    method:"delete",
                    url:$rootScope.$siteUrl+'Delete/'+trainee.id,
                }).then(function(response){
                    $scope.trainee=response.data;
                    console.log($scope.trainee,"Delete");
                UIkit.modal.confirm('Remove this row?', function(){
                $scope.traineesData.splice(index,1);
                $toast("Trainee Data Delete Successfully",'success');
                });
                })
            };

//TraineeName Get 

    $scope.Traineename=function(){
        $http({
            method:'get',
            url:$rootScope.$siteUrl+'Traineename',

        }).then(function(response){
            $scope.Traineename= response.data;
            $scope.selectize_val_options=$scope.Traineename;
         console.log($scope.selectize_val_options,"Traineename");
        })
    }
    $scope.Traineename();
    

// Selectize TraneeName

              $scope.selectize_val_options = [];
              console.log($scope.selectize_val_options,"try");

            $scope.selectize_val_config = {
                maxItems: 1,
                valueField: 'Traineename',
                labelField: 'Traineename',
                create: false,
                placeholder: 'Select Trainee Name..'
            };

// Selectize Course Data

             $scope.selectize_val_options1 = [
                { value: 'Testing', label: 'Testing' },
                { value: 'Java', label: 'Java' },
                { value: 'Angular js', label: 'Angular js' },
                { value: 'Angular', label: 'Angular' },
                { value: 'JavaScript', label: 'JavaScript' },
                { value: '.Net', label: '.Net' }
            ];

            $scope.selectize_val_config1 = {
                maxItems: 1,
                valueField: 'value',
                labelField: 'label',
                create: false,
                placeholder: 'Select Course..'
            };

        }
    )
    