/*
 *  cllc Admin AngularJS
 */
;
"use strict";

var hrmsApp = angular.module('hrmsApp', [
    'ui.router',
    'oc.lazyLoad',
    'ngSanitize',
    'ngRetina',
    'ncy-angular-breadcrumb',
    'ConsoleLogger'
]);

hrmsApp.constant('variables', {
    header_main_height: 48,
    easing_swiftOut: [0.4, 0, 0.2, 1],
    bez_easing_swiftOut: $.bez([0.4, 0, 0.2, 1])
});

hrmsApp.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
'self',
        'https://w.soundcloud.com/**'
    ]);
});

// breadcrumbs
hrmsApp.config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        prefixStateName: 'restricted.dashboard',
        templateUrl: 'app/templates/breadcrumbs.tpl.html'
    });
});

/* detect IE */
function detectIE() {
    var a = window.navigator.userAgent,
        b = a.indexOf("MSIE ");
    if (0 < b) return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10);
    if (0 < a.indexOf("Trident/")) return b = a.indexOf("rv:"), parseInt(a.substring(b + 3, a.indexOf(".", b)), 10);
    b = a.indexOf("Edge/");
    return 0 < b ? parseInt(a.substring(b + 5, a.indexOf(".", b)), 10) : !1
};

/* Run Block */
// From cllc //
hrmsApp
    .run([
        '$rootScope',
        '$state',
        '$stateParams',
        '$http',
        '$window',
        '$timeout',
        'variables',
        '$transitions',
        '$trace',
        '$Sessionmanager',
        function ($rootScope, $state, $stateParams, $http, $window, $timeout, variables, $transitions, $trace, $Sessionmanager) {

//LocalStorage Data

           var data = localStorage.getItem('response.data');
           var data1 = JSON.parse(data);
           $rootScope.user = data1;
            //   console.log($rootScope.user,"tst");

//End




            // $rootScope.$state = $state;
            // $rootScope.$stateParams = $stateParams;
            $rootScope.$siteUrl = "http://127.0.0.1:8000/api/";
            // $rootScope.$UploadUrl="https://localhost/api/";

            // window.console.error=function(){
            //     console.log();
            // };
            var expired = function () {
                var exprired = moment(moment(new Date(localStorage.sessionExpire))).diff(moment(), 'minutes');
                // console.log(exprired, "--calculate--");
                if (exprired <= 0) {
                    localStorage.clear();
                    $state.go('login');
                }
            };
            expired();

            var checkdata = function () {
                var d = new Date();
                var n = d.toLocaleTimeString();
                if (n == "12:00:00 AM") {
                    alert("time");
                    $Sessionmanager.payroll();
                }
            }
            setInterval(function () {
                checkdata();
            }, 1000)

            $transitions.onSuccess({}, function ($transition) {

                // var session = $sessionManager.getSession("session");
                //BackButton Disable
                window.onpopstate = function (e) {
                    // alert(
                    //   "Browser back button disabled for security reason. Please use the back button in the application or navigate to other section from the left side menu"
                    // );
                    window.history.forward(1);
                };

                // console.log($transition._targetState._identifier, 'transition');
                // var _current_state = $transition._targetState._identifier;

                // /* #region  if there is no token its render to login Page  */
                // var userdata = JSON.parse($Sessionmanager.getStorage("UserData"));

                // console.log(userdata, 'userdata');
                // if (userdata != null) {
                //     $state.go(_current_state);
                // } else {
                //     $state.go('login');
                // }
                // /* #endregion */

                // expired();

                // var currentSession = localStorage.getItem("sessionExpire");
                // if (currentSession != "Invalid date") {
                //     var _extend = moment(new Date(currentSession)).add(2, 'minutes');
                //     localStorage.setItem('sessionExpire', _extend);
                // }
                // scroll view to top
                $("html, body").animate({
                    scrollTop: 0
                }, 200);

                if (detectIE()) {
                    $('svg,canvas,video').each(function () {
                        $(this).css('height', 0);
                    });
                };

                $timeout(function () {
                    $rootScope.pageLoading = false;
                }, 300);

                $timeout(function () {
                    $rootScope.pageLoaded = true;
                    $rootScope.appInitialized = true;
                    // wave effects
                    $window.Waves.attach('.md-btn-wave,.md-fab-wave', ['waves-button']);
                    $window.Waves.attach('.md-btn-wave-light,.md-fab-wave-light', ['waves-button', 'waves-light']);
                    if (detectIE()) {
                        $('svg,canvas,video').each(function () {
                            var $this = $(this),
                                height = $(this).attr('height'),
                                width = $(this).attr('width');

                            if (height) {
                                $this.css('height', height);
                            }
                            if (width) {
                                $this.css('width', width);
                            }
                            var peity = $this.prev('.peity_data,.peity');
                            if (peity.length) {
                                peity.peity().change()
                            }
                        });
                    }
                }, 600);


            });

            $transitions.onStart({}, function ($transition) {


                var _current_state = $transition._targetState._identifier;
                localStorage.setItem("_current_state", _current_state);
                var session = JSON.parse($Sessionmanager.getStorage("UserData"));
                if ($transition._targetState._identifier == "login") {
                    if (session !== null) {
                        $state.go("restricted.dashboard");
                    }
                }
                // main search
                $rootScope.mainSearchActive = false;
                // secondary sidebar
                $rootScope.sidebar_secondary = false;
                $rootScope.secondarySidebarHiddenLarge = false;

                if ($($window).width() < 1220) {
                    // hide primary sidebar
                    $rootScope.primarySidebarActive = false;
                    $rootScope.hide_content_sidebar = false;
                }

                var params = $transition.params();
                if (!params.hasOwnProperty('hidePreloader')) {
                    $rootScope.pageLoading = true;
                    $rootScope.pageLoaded = false;
                }

            });

            // fastclick (eliminate the 300ms delay between a physical tap and the firing of a click event on mobile browsers)
            FastClick.attach(document.body);

            // get version from package.json
            $http.get('./package.json').then(function onSuccess(response) {
                $rootScope.appVer = response.version;
            });

            // modernizr
            $rootScope.Modernizr = Modernizr;

            // get window width
            var w = angular.element($window);
            $rootScope.largeScreen = w.width() >= 1220;

            w.on('resize', function () {
                return $rootScope.largeScreen = w.width() >= 1220;
            });

            // show/hide main menu on page load
            $rootScope.primarySidebarOpen = $rootScope.largeScreen;

            $rootScope.pageLoading = true;

            // wave effects
            $window.Waves.init();

        }
    ])
    .run(['PrintToConsole', function (PrintToConsole) {
        PrintToConsole.active = false;
    }]);

