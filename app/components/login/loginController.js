angular
    .module('hrmsApp')
    .controller('loginCtrl', [
        '$scope',
        '$rootScope',
        'utils',
        '$http',
        '$state',
        '$toast',
        function ($scope,$rootScope,utils,$http,$state,$toast) {

                    // var UserData = data1[0].id;
                // console.log(data1[0].id,"Empolyee View Page")
//Sign Page
            $scope.Signin = function(postdata){
                //console.log(data.username,"un");
                //console.log(data.password,"pa");
                $http({
                    method:'post',
                    url:$rootScope.$siteUrl+'Login',
                    data:postdata
                }).then(function(response){
                        console.log(response,"aaaa");
                        $scope.users = response.data;
                        
                        // var user = localStorage.setItem(response.data)
                        var user1=localStorage.setItem('response.data',JSON.stringify(response.data));
                        console.log($scope.users,"check");
                        
                        if($scope.users!=""){
                            $state.go("restricted.dashboard");
                            $toast('login sucessfully','success');
                            // console.log($scope.users,"if");
                        }
                        else{
                            // console.log($scope.users,"else");

                            $toast('UserName and Password is Not Match ','danger');

                        }
                    })
            }
            
//For Referance//

            // $scope.Signin = function(data){
            //     $scope.UserName=data.username;
            //     $scope.Password=data.password;
            //     console.log($scope.UserName,$scope.Password,"check")
            //     $scope.UserPass= function(){
            //         $http({
            //             method:'GET',
            //             url:'http://127.0.0.1:8000/api/users',
            //         }).then(function(response){
            //             $scope.data=response.data;
            //             console.log($scope.data,"keerthi");

            //             for (var i = 0; i < $scope.data.length; i++) {
            //                 var UserName = $scope.data[i].UserName;
            //                 var Password = $scope.data[i].Password;
            //             if (UserName == $scope.UserName && Password==$scope.Password) {
            //                 $state.go("restricted.dashboard");
            //                 console.log("login");
            //                 $toast('login sucessfully','success');
            //             }
                        
            //             }

            //         })
            //         // angular.forEach($scope.data,function(uerpass){
            //         //     $scope.keerthi=$scope.uerpass;

            //         //     return ($scope.keerthi);
            //         // })
            //         //     console.log($scope.keerthi,"check");

            //     }
            //     $scope.UserPass();
            // }



            $scope.registerFormActive = false;

            var $login_card = $('#login_card'),
                $login_form = $('#login_form'),
                $login_help = $('#login_help'),
                // $register_form = $('#register_form'),
                $login_password_reset = $('#login_password_reset');

            // show login form (hide other forms)
            var login_form_show = function() {
                $login_form
                    .show()
                    .siblings()
                    .hide();
            };

            // // show register form (hide other forms)
            // var register_form_show = function() {
            //     $register_form
            //         .show()
            //         .siblings()
            //         .hide();
            // };

            // show login help (hide other forms)
            var login_help_show = function() {
                $login_help
                    .show()
                    .siblings()
                    .hide();
            };

            // show password reset form (hide other forms)
            var password_reset_show = function() {
                $login_password_reset
                    .show()
                    .siblings()
                    .hide();
            };

            $scope.loginHelp = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,login_help_show,undefined);
            };

            $scope.backToLogin = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = false;
                utils.card_show_hide($login_card,undefined,login_form_show,undefined);
            };

            // $scope.registerForm = function($event) {
            //     $event.preventDefault();
            //     $scope.registerFormActive = true;
            //     utils.card_show_hide($login_card,undefined,register_form_show,undefined);
            // };

            $scope.passwordReset = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,password_reset_show,undefined);
            };

        }
    ]);