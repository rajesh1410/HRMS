angular
  .module("hrmsApp")
  .controller("EmployeesDataCtrl", function(
    $compile,
    $scope,
    $timeout,
    $toast,
    $resource,
    DTOptionsBuilder,
    DTColumnDefBuilder,
    $state,
    $http,
    $rootScope
  ) {
    //#region Data table
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
      .withDOM(
        "<'dt-uikit-header'<'uk-grid'<'uk-width-medium-2-3'l><'uk-width-medium-1-3'f>>>" +
          "<'uk-overflow-container'tr>" +
          "<'dt-uikit-footer'<'uk-grid'<'uk-width-medium-3-10'i><'uk-width-medium-7-10'p>>>"
      )
      .withOption("createdRow", function(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
      })
      .withOption("headerCallback", function(header) {
        if (!vm.headerCompiled) {
          // Use this headerCompiled field to only compile header once
          vm.headerCompiled = true;
          $compile(angular.element(header).contents())($scope);
        }
      })
      .withOption("language", {
        emptyTable:
          "If no companies are listed, there are no active employers at this time."
      })
      .withPaginationType("full_numbers")
      .withColumnFilter({
        aoColumns: [
          null,
          {
            type: "text",
            bRegex: true,
            bSmart: true
          },
          {
            type: "number",
            bRegex: true,
            bSmart: true
          },
          {
            type: "text",
            bRegex: true,
            bSmart: true
          },
          {
            type: "number",
            bRegex: true,
            bSmart: true
          },
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          {
            type: "text",
            bRegex: true,
            bSmart: true
          },
          {
            type: "number",
            bRegex: true,
            bSmart: true
          },
          {
            type: "number",
            bRegex: true,
            bSmart: true
          }
        ]
      })
      .withButtons([
        {
          extend: "excelHtml5",
          text: '<i class="uk-icon-file-excel-o"></i> XLSX',
          titleAttr: "",
          exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
          }
        },
        {
          extend: "pdfHtml5",
          text: '<i class="uk-icon-file-pdf-o"></i> PDF',
          titleAttr: "PDF",
          orientation: "landscape",
          exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
          }
        }
      ])
      .withOption("initComplete", function() {
        $timeout(function() {
          $compile($(".dt-uikit .md-input"))($scope);
        });
      });
    //#endregion



   

    $scope.save = function(postdata) {
      var id = postdata.id;
      $(".http_preloader").show();
      $http({
          method: 'post',
          url: $rootScope.$siteUrl+'status_check/'+ id,
         // headers:{"Content-Type":undefined},
          data: postdata
      }).then(function success(response) {
          console.log(response,'response');
          $scope.getallData();
          $toast(response.data,'success');
          $(".http_preloader").hide();
      });
    };



    $scope.getallData = function() {
        $(".http_preloader").show(); 
      $http({
        method: "get",
        url: $rootScope.$siteUrl + "status_tf"
      }).then(function(response) {
        $scope.data = response.data[0];
        $scope.data1 = response.data[1];
        $(".http_preloader").hide(); 
      });
    };
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
                url: $rootScope.$siteUrl + "status_delete/" + id
                // params: { id: id }
              }).then(function(result) {
                console.log(result, "Mohana");
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
  });
