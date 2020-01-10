angular
    .module('hrmsApp')
    .controller('attendance_reportCtrl',
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



// Find Trainee Data

    $scope.find=function(postdata){
        console.log(postdata,"find data");
        $http({
            method:'post',
            url:$rootScope.$siteUrl+'attendance_report',
            data:postdata
        }).then(function(response){
            $scope.day = response.data[0];
            $scope.name = response.data[1];
            console.log($scope.day,'day')
            console.log($scope.name,'name')
            
            $scope.Search={};
            // $scope.log = [].concat.apply([], $scope.login);
            // console.log($scope.log ,'foreach login')
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
                UIkit.modal.confirm('Remove this Data?', function(){
                $http({
                    method:"delete",
                    url:$rootScope.$siteUrl+'Delete/'+trainee.id,
                }).then(function(response){
                    $scope.trainee=response.data;
                    console.log($scope.trainee,"Delete");
                $scope.traineesData.splice(index,1);
                $toast("Trainee Data Delete Successfully",'success');
                });
                })
            };

//TraineeName Get

    $scope.get_employee=function(){
        $http({
            method:'get',
            url:$rootScope.$siteUrl+'status_data',

        }).then(function(response){
            $scope.employee= response.data;
            $scope.selectize_val_options=$scope.employee;
         console.log($scope.selectize_val_options,"employee");
        })
    }
    $scope.get_employee();


// Selectize TraneeName

            $scope.selectize_val_options = [];
            $scope.selectize_val_config = {
                maxItems: 1,
                valueField: 'employee_id',
                labelField: 'full_name',
                create: false,
                placeholder: 'EmployeeName..'
            };



        }
    )
