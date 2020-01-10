angular
    .module('hrmsApp')
    .controller('main_headerCtrl', [
        '$timeout',
        '$scope',
        '$window',
        '$state',
        '$http',
        '$rootScope',
        function ($timeout, $scope, $window, $state,$http,$rootScope) {

//LocalStorage Data

            var data = localStorage.getItem('response.data');
            var data1 = JSON.parse(data);
            var UserId = data1[0].id; 
             $scope.img_path = 'upload/';
            //  console.log(UserId,'show');

//Get User Deatil

             $scope.GetEmpolyeeDeatil = function(UserId) {
                //  console.log(UserId , 'GetEmpolyeeDeatil')
                $http({
                    method: 'get',
                    url: $rootScope.$siteUrl+'show/' + UserId,
                }).then(function mySuccess(response) {
                    
                    $scope.view = response.data;
                    //  console.log(response.data,"response.data");
                   
                    angular.forEach(response, function(value, key) {
                        if (value.MeetingDate) {
                            value.MeetingDate = MonthLetterFilter(value.MeetingDate);
                        }
                    });
                    
                });
            }
             $scope.GetEmpolyeeDeatil(UserId);


            $scope.user_data = {
                name: "Lue Feest",
                avatar: "assets/img/avatar.jpg",
                alerts: [{
                        "title": "Hic expedita eaque.",
                        "content": "Nemo nemo voluptatem officia voluptatum minus.",
                        "type": "warning"
                    },
                    {
                        "title": "Voluptatibus sed eveniet.",
                        "content": "Tempora magnam aut ea.",
                        "type": "success"
                    },
                    {
                        "title": "Perferendis voluptatem explicabo.",
                        "content": "Enim et voluptatem maiores ab fugiat commodi aut repellendus.",
                        "type": "danger"
                    },
                    {
                        "title": "Quod minima ipsa.",
                        "content": "Vel dignissimos neque enim ad praesentium optio.",
                        "type": "primary"
                    }
                ],
                messages: [{
                        "title": "Reiciendis aut rerum.",
                        "content": "In adipisci amet nostrum natus recusandae animi fugit consequatur.",
                        "sender": "Korbin Doyle",
                        "color": "cyan"
                    },
                    {
                        "title": "Tenetur commodi animi.",
                        "content": "Voluptate aut quis rerum laborum expedita qui eaque doloremque a corporis.",
                        "sender": "Alia Walter",
                        "color": "indigo",
                        "avatar": "assets/img/avatars/avatar_07_tn.png"
                    },
                    {
                        "title": "At quia quis.",
                        "content": "Fugiat rerum aperiam et deleniti fugiat corporis incidunt aut enim et distinctio.",
                        "sender": "William Block",
                        "color": "light-green"
                    },
                    {
                        "title": "Incidunt sunt.",
                        "content": "Accusamus necessitatibus officia porro nisi consectetur dolorem.",
                        "sender": "Delilah Littel",
                        "color": "blue",
                        "avatar": "assets/img/avatars/avatar_02_tn.png"
                    },
                    {
                        "title": "Porro ut.",
                        "content": "Est vitae magni eum expedita odit quisquam natus vel maiores.",
                        "sender": "Amira Hagenes",
                        "color": "amber",
                        "avatar": "assets/img/avatars/avatar_09_tn.png"
                    }
                ]
            };

            $scope.alerts_length = $scope.user_data.alerts.length;
            $scope.messages_length = $scope.user_data.messages.length;


            $('#menu_top').children('[data-uk-dropdown]').on('show.uk.dropdown', function () {
                $timeout(function () {
                    $($window).resize();
                }, 280)
            });

            // autocomplete
            $('.header_main_search_form').on('click', '#autocomplete_results .item', function (e) {
                e.preventDefault();
                var $this = $(this);
                $state.go($this.attr('href'));
                $('.header_main_search_input').val('');
            })

            // $scope.data = "sarveswaraa";
            // $scope.imagePaths = "upload/";
            // var userdata = JSON.parse($Sessionmanager.getStorage("UserData"));
            // console.log(userdata)
            // $scope.UserName = userdata.UserName;
            // $scope.EmplyeeId = userdata.EmployeeID;
            // $scope.profileImage = userdata.employeeProfileImage;
            // $scope.Logout = function () {
            //     localStorage.clear();
            //  // $state.go("login");
            //     localStorage.clear();
            //     location.reload("login");
            //      var checkuserdata = JSON.parse($Sessionmanager.getStorage("UserData"));
            //      console.log(checkuserdata,"--after logout check--");
            // }

        }
    ]);