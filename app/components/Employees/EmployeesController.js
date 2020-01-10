angular
    .module('hrmsApp')
    .controller('EmployeesCtrl',
        function($compile, $scope, $timeout, $resource, DTOptionsBuilder, DTColumnDefBuilder, $state, $http, $rootScope) {
            
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

                        {
                            type: 'null',
                            bRegex: true,
                            bSmart: true
                        }, {
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
                        },
                        {
                            type: 'text',
                            bRegex: true,
                            bSmart: true
                        }

                    ]
                })
                


            $scope.getallData = function(){
                console.log("Mohana");
                $http({
                        method: 'get',
                        url: $rootScope.$siteUrl+'employee_data'

                    }).then(function(response){
                        $scope.traineesData = response.data;
                        console.log($scope.traineesData);
                    })
            }
            $scope.getallData();

    $scope.delete = function(id, index) {
        // alert(id);
      if (id) {
        UIkit.modal.confirm(
          "Are you sure to delete ?",
          function(e) {
            if (id) {
              $http({
                method: "DELETE",
                url: $rootScope.$siteUrl+'employee_delete/'+ id,
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

            // $scope.edit = function($event,index){
            //     $event.preventDefault();
            //     $scope.entity = $scope.traineesData[index];
            //     $scope.entity.index = index;
            //     $scope.entity.editable = true;
            // };
            $scope.save = function($event,index){
                $event.preventDefault();
                $scope.users[index].editable = false;

            };


            

        }
    )
    