/*
*  cllc Admin AngularJS
*/
;"use strict";

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
    easing_swiftOut: [ 0.4,0,0.2,1 ],
    bez_easing_swiftOut: $.bez([ 0.4,0,0.2,1 ])
});

hrmsApp.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**',
        'https://w.soundcloud.com/**'
    ]);
});

// breadcrumbs
hrmsApp.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        prefixStateName: 'restricted.dashboard',
        templateUrl: 'app/templates/breadcrumbs.tpl.html'
    });
});

/* detect IE */
function detectIE(){var a=window.navigator.userAgent,b=a.indexOf("MSIE ");if(0<b)return parseInt(a.substring(b+5,a.indexOf(".",b)),10);if(0<a.indexOf("Trident/"))return b=a.indexOf("rv:"),parseInt(a.substring(b+3,a.indexOf(".",b)),10);b=a.indexOf("Edge/");return 0<b?parseInt(a.substring(b+5,a.indexOf(".",b)),10):!1};

/* Run Block */
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
        function ($rootScope, $state, $stateParams,$http,$window, $timeout,variables,$transitions,$trace) {

            $trace.enable('TRANSITION');

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$siteUrl = "https://localhost/api/";
            $rootScope.$UploadUrl="https://localhost/api/";

  

            $transitions.onSuccess({},function ($transition) {

                // scroll view to top
                $("html, body").animate({
                    scrollTop: 0
                }, 200);

                if(detectIE()) {
                    $('svg,canvas,video').each(function () {
                        $(this).css('height', 0);
                    });
                };

                $timeout(function() {
                    $rootScope.pageLoading = false;
                },300);

                $timeout(function() {
                    $rootScope.pageLoaded = true;
                    $rootScope.appInitialized = true;
                    // wave effects
                    $window.Waves.attach('.md-btn-wave,.md-fab-wave', ['waves-button']);
                    $window.Waves.attach('.md-btn-wave-light,.md-fab-wave-light', ['waves-button', 'waves-light']);
                    if(detectIE()) {
                        $('svg,canvas,video').each(function() {
                            var $this = $(this),
                                height = $(this).attr('height'),
                                width = $(this).attr('width');

                            if(height) {
                                $this.css('height', height);
                            }
                            if(width) {
                                $this.css('width', width);
                            }
                            var peity = $this.prev('.peity_data,.peity');
                            if(peity.length) {
                                peity.peity().change()
                            }
                        });
                    }
                },600);

            });

            $transitions.onStart({},function($transition) {

                // main search
                $rootScope.mainSearchActive = false;
                // secondary sidebar
                $rootScope.sidebar_secondary = false;
                $rootScope.secondarySidebarHiddenLarge = false;

                if($($window).width() < 1220 ) {
                    // hide primary sidebar
                    $rootScope.primarySidebarActive = false;
                    $rootScope.hide_content_sidebar = false;
                }

                var params = $transition.params();
                if(!params.hasOwnProperty('hidePreloader')) {
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

            w.on('resize', function() {
                return $rootScope.largeScreen = w.width() >= 1220;
            });

            // show/hide main menu on page load
            $rootScope.primarySidebarOpen = $rootScope.largeScreen;

            $rootScope.pageLoading = true;

            // wave effects
            $window.Waves.init();

        }
    ])
    .run(['PrintToConsole', function(PrintToConsole) {
        PrintToConsole.active = false;
    }])
;

hrmsApp
    .factory('windowDimensions', [
        '$window',
        function($window) {
            return {
                height: function() {
                    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                },
                width: function() {
                    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                }
            }
        }
    ])
    .factory('utils', [
        function () {
            return {
                // Util for finding an object by its 'id' property among an array
                findByItemId: function findById(a, id) {
                    for (var i = 0; i < a.length; i++) {
                        if (a[i].item_id == id) return a[i];
                    }
                    return null;
                },
                findById: function findById(a, id) {
                    for (var i = 0; i < a.length; i++) {
                        if (a[i].id == id) return a[i];
                    }
                    return null;
                },
                // serialize form
                serializeObject: function (form) {
                    var o = {};
                    var a = form.serializeArray();
                    $.each(a, function () {
                        if (o[this.name] !== undefined) {
                            if (!o[this.name].push) {
                                o[this.name] = [o[this.name]];
                            }
                            o[this.name].push(this.value || '');
                        } else {
                            o[this.name] = this.value || '';
                        }
                    });
                    return o;
                },
                // high density test
                isHighDensity: function () {
                    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
                },
                // touch device test
                isTouchDevice: function () {
                    return !!('ontouchstart' in window);
                },
                // local storage test
                lsTest: function () {
                    var test = 'test';
                    try {
                        localStorage.setItem(test, test);
                        localStorage.removeItem(test);
                        return true;
                    } catch (e) {
                        return false;
                    }
                },
                // show/hide card
                card_show_hide: function (card, begin_callback, complete_callback, callback_element) {
                    $(card)
                        .velocity({
                            scale: 0,
                            opacity: 0.2
                        }, {
                            duration: 400,
                            easing: [0.4, 0, 0.2, 1],
                            // on begin callback
                            begin: function () {
                                if (typeof begin_callback !== 'undefined') {
                                    begin_callback(callback_element);
                                }
                            },
                            // on complete callback
                            complete: function () {
                                if (typeof complete_callback !== 'undefined') {
                                    complete_callback(callback_element);
                                }
                            }
                        })
                        .velocity('reverse');
                },
                randomNUmber: function (min,max) {
                    return Math.floor( Math.random()*(max-min+1)+min );
                }
            };
        }]
    )
;

angular.module("ConsoleLogger", [])
    .factory("PrintToConsole", ["$rootScope", function ($rootScope) {
        var handler = { active: false };
        handler.toggle = function () { handler.active = !handler.active; };
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (handler.active) {
                console.log("$stateChangeStart --- event, toState, toParams, fromState, fromParams");
                console.log(arguments);
            };
        });
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (handler.active) {
                console.log("$stateChangeError --- event, toState, toParams, fromState, fromParams, error");
                console.log(arguments);
            };
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (handler.active) {
                console.log("$stateChangeSuccess --- event, toState, toParams, fromState, fromParams");
                console.log(arguments);
            };
        });
        $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
            if (handler.active) {
                console.log("$viewContentLoading --- event, viewConfig");
                console.log(arguments);
            };
        });
        $rootScope.$on('$viewContentLoaded', function (event) {
            if (handler.active) {
                console.log("$viewContentLoaded --- event");
                console.log(arguments);
            };
        });
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            if (handler.active) {
                console.log("$stateNotFound --- event, unfoundState, fromState, fromParams");
                console.log(arguments);
            };
        })
        return handler;
    }]);
hrmsApp
    .service('detectBrowser', [
        '$window',
        function($window) {
            // http://stackoverflow.com/questions/22947535/how-to-detect-browser-using-angular
            return function() {
                var userAgent = $window.navigator.userAgent,
                    browsers  = {
                        chrome  : /chrome/i,
                        safari  : /safari/i,
                        firefox : /firefox/i,
                        ie      : /internet explorer/i
                    };

                for ( var key in browsers ) {
                    if ( browsers[key].test(userAgent) ) {
                        return key;
                    }
                }
                return 'unknown';
            }
        }
    ])
    .service('preloaders', [
        '$rootScope',
        '$timeout',
        'utils',
        function($rootScope,$timeout,utils) {
            $rootScope.content_preloader_show = function(style,variant,container,width,height) {
                var $body = $('body');
                if(!$body.find('.content-preloader').length) {
                    var image_density = utils.isHighDensity() ? '@2x' : '',
                        width = width ? width : 48,
                        height = height ? height : 48;

                    var preloader_content = (style == 'regular')
                        ? '<img src="assets/img/spinners/spinner' + image_density + '.gif" alt="" width="32" height="32">'
                        : '<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="'+height+'" width="'+width+'" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';

                    var thisContainer = (typeof container !== 'undefined') ? $(container) : $body;

                    thisContainer.append('<div class="content-preloader content-preloader-'+variant+'" style="height:'+height+'px;width:'+width+'px;margin-left:-'+width/2+'px">' + preloader_content + '</div>');
                    $timeout(function() {
                        $('.content-preloader').addClass('preloader-active');
                    });
                }
            };
            $rootScope.content_preloader_hide = function() {
                var $body = $('body');
                if($body.find('.content-preloader').length) {
                    // hide preloader
                    $('.content-preloader').removeClass('preloader-active');
                    // remove preloader
                    $timeout(function() {
                        $('.content-preloader').remove();
                    }, 500);
                }
            };

        }
    ])
;
/*
*  directives
*/
;'use strict';

hrmsApp
    // page title
    .directive('pageTitle', [
        '$rootScope',
        '$timeout',
        '$transitions',
        function($rootScope, $timeout,$transitions) {
            return {
                restrict: 'A',
                link: function() {

                    $transitions.onSuccess({},function ($transition) {
                        var default_title = 'CLLC',
                            state = $transition.to();
                        $timeout(function() {
                            $rootScope.page_title = (state.data && state.data.pageTitle)
                                ? default_title + ' - ' + state.data.pageTitle : default_title;
                        });
                    });
                }

            }
        }
    ])
    // add width/height properities to Image
    .directive('addImageProp', [
        '$timeout',
        'utils',
        function ($timeout,utils) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    elem.on('load', function () {
                        $timeout(function() {
                            var w = !utils.isHighDensity() ? $(elem).actual('width') : $(elem).actual('width')/2,
                                h = !utils.isHighDensity() ? $(elem).actual('height') : $(elem).actual('height')/2;
                            $(elem).attr('width',w).attr('height',h);
                        })
                    });
                }
            };
        }
    ])
    // print page
    .directive('printPage', [
        '$rootScope',
        '$timeout',
        function ($rootScope,$timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var message = attrs['printMessage'];
                    $(elem).on('click', function(e) {
                        e.preventDefault();
                        UIkit.modal.confirm(message ? message : 'Do you want to print this page?', function () {
                            // hide sidebar
                            $rootScope.primarySidebarActive = false;
                            $rootScope.primarySidebarOpen = false;
                            // wait for dialog to fully hide
                            $timeout(function () {
                                window.print();
                            }, 300)
                        }, {
                            labels: {
                                'Ok': 'print'
                            }
                        });
                    });
                }
            };
        }
    ])
    // full screen
    .directive('fullScreenToggle', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    $(elem).on('click', function(e) {
                        e.preventDefault();
                        if(screenfull.enabled) {
                            screenfull.request();
                            $(elem).children('.material-icons').text("fullscreen_exit");
                            if(screenfull.isFullscreen) {
                                screenfull.exit();
                                $(elem).children('.material-icons').text("fullscreen");
                            }
                        }
                        $(window).resize();
                    });
                }
            };
        }
    ])
    // single card
    .directive('singleCard', [
        '$window',
        '$timeout',
        function ($window,$timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {

                    var $md_card_single = $(elem),
                        w = angular.element($window);

                    function md_card_content_height() {
                        var content_height = w.height() - ((48 * 2) + 12);
                        $md_card_single.find('.md-card-content').innerHeight(content_height);
                    }

                    $timeout(function() {
                        md_card_content_height();
                    },100);

                    w.on('resize', function(e) {
                        // Reset timeout
                        $timeout.cancel(scope.resizingTimer);
                        // Add a timeout to not call the resizing function every pixel
                        scope.resizingTimer = $timeout( function() {
                            md_card_content_height();
                            return scope.$apply();
                        }, 280);
                    });

                }
            }
        }
    ])
    // outside list
    .directive('listOutside', [
        '$window',
        '$timeout',
        function ($window,$timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attr) {

                    var $md_list_outside_wrapper = $(elem),
                        w = angular.element($window);

                    function md_list_outside_height() {
                        var content_height = w.height() - ((48 * 2) + 10);
                        $md_list_outside_wrapper.height(content_height);
                    }

                    md_list_outside_height();

                    w.on('resize', function(e) {
                        // Reset timeout
                        $timeout.cancel(scope.resizingTimer);
                        // Add a timeout to not call the resizing function every pixel
                        scope.resizingTimer = $timeout( function() {
                            md_list_outside_height();
                            return scope.$apply();
                        }, 280);
                    });

                }
            }
        }
    ])
    // callback on last element in ng-repeat
    .directive('onLastRepeat', function ($timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    scope.$emit('onLastRepeat', element, attrs);
                })
            }
        };
    })
    // check table row
    .directive('tableCheckAll', [
        '$window',
        '$timeout',
        function ($window,$timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attr) {

                    var $checkRow = $(elem).closest('table').find('.check_row');

                    $(elem)
                        .on('ifChecked',function() {
                            $checkRow.iCheck('check');
                        })
                        .on('ifUnchecked',function() {
                            $checkRow.iCheck('uncheck');
                        });

                }
            }
        }
    ])
    // table row check
    .directive('tableCheckRow', [
        '$window',
        '$timeout',
        function ($window,$timeout) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attr, ngModel) {

                    var $this = $(elem);

                    scope.$watch(function () {
                        return ngModel.$modelValue;
                    }, function(newValue) {
                        if(newValue) {
                            $this.closest('tr').addClass('row_checked');
                        } else {
                            $this.closest('tr').removeClass('row_checked');
                        }
                    });

                }
            }
        }
    ])
    // table row childrens check
    .directive('tableCheckChildrens', [
        '$window',
        '$timeout',
        function ($window,$timeout) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attr, ngModel) {

                    var $this = $(elem).closest('tr'),
                        $thisChildrens = $this.nextUntil('.table-parent-row').find('.check_row');

                    $this
                        .on('ifChecked',function() {
                            $this.addClass('row_checked');
                            $thisChildrens.iCheck('check');
                        })
                        .on('ifUnchecked',function() {
                            $this.removeClass('row_checked');
                            $thisChildrens.iCheck('uncheck');
                        });

                }
            }
        }
    ])
    // table tree toggle
    .directive('tableTreeToggle', [
        '$window',
        '$timeout',
        function ($window,$timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attr, ngModel) {

                    $(elem).closest('tr.show_child_row').nextUntil('.table-parent-row').hide();

                    $(elem).on('click', function(e) {
                        e.preventDefault();
                        $(this).closest('tr').toggleClass('show_child_row').nextUntil('.table-parent-row').toggle();
                    });

                }
            }
        }
    ])
    // content sidebar
    .directive('contentSidebar', [
        '$rootScope',
        '$document',
        function ($rootScope,$document) {
            return {
                restrict: 'A',
                link: function(scope,el,attr) {

                    if(!$rootScope.header_double_height) {
                        $rootScope.$watch('hide_content_sidebar', function() {
                            if($rootScope.hide_content_sidebar) {
                                $('#page_content').css('max-height', $('html').height() - 40);
                                $('html').css({
                                    'paddingRight': scrollbarWidth(),
                                    'overflow': 'hidden'
                                });
                            } else {
                                $('#page_content').css('max-height','');
                                $('html').css({
                                    'paddingRight': '',
                                    'overflow': ''
                                });
                            }
                        });

                    }
                }
            }
        }
    ])
    // attach events to document
    .directive('documentEvents', [
        '$rootScope',
        '$window',
        '$timeout',
        'variables',
        function ($rootScope, $window, $timeout,variables) {
            return {
                restrict: 'A',
                link: function(scope,el,attr) {

                    var hidePrimarySidebar = function() {
                        $rootScope.primarySidebarActive = false;
                        $rootScope.primarySidebarOpen = false;
                        $rootScope.hide_content_sidebar = false;
                        $rootScope.primarySidebarHiding = true;
                        $timeout(function() {
                            $rootScope.primarySidebarHiding = false;
                        },280);
                    };

                    var hideSecondarySidebar = function() {
                        $rootScope.secondarySidebarActive = false;
                    };

                    var hideMainSearch = function() {
                        var $header_main = $('#header_main');
                        $header_main
                            .children('.header_main_search_form')
                            .velocity("transition.slideUpBigOut", {
                                duration: 280,
                                easing: variables.easing_swiftOut,
                                begin: function() {
                                    $header_main.velocity("reverse");
                                    $rootScope.mainSearchActive = false;
                                },
                                complete: function() {
                                    $header_main
                                        .children('.header_main_content')
                                        .velocity("transition.slideDownBigIn", {
                                            duration: 280,
                                            easing: variables.easing_swiftOut,
                                            complete: function() {
                                                $('.header_main_search_input').blur().val('');
                                            }
                                        })
                                }
                            });
                    };

                    // hide components on $document click
                    scope.onClick = function ($event) {
                        // primary sidebar
                        if( $rootScope.primarySidebarActive && !$($event.target).closest('#sidebar_main').length && !$($event.target).closest('#sSwitch_primary').length && !$rootScope.largeScreen) {
                            hidePrimarySidebar();
                        }
                        // secondary sidebar
                        if( ($rootScope.secondarySidebarActive && !$($event.target).closest('#sidebar_secondary').length && !$($event.target).closest('#sSwitch_secondary').length) && !$rootScope.secondarySidebarPersistent) {
                            hideSecondarySidebar();
                        }
                        // main search form
                        if( $rootScope.mainSearchActive && !$($event.target).closest('.header_main_search_form').length && !$($event.target).closest('#main_search_btn').length) {
                            hideMainSearch();
                        }
                        // style switcher
                        if( $rootScope.styleSwitcherActive && !$($event.target).closest('#style_switcher').length) {
                            $rootScope.styleSwitcherActive = false;
                        }
                        // sticky notes form
                        if( $rootScope.noteFormActive && !$($event.target).closest('#note_form').length) {
                            $rootScope.noteFormActive = false;
                        }
                    };

                    // hide components on key press (esc)
                    scope.onKeyUp = function ($event) {
                        // primary sidebar
                        if( $rootScope.primarySidebarActive && !$rootScope.largeScreen && $event.keyCode == 27) {
                            hidePrimarySidebar();
                        }
                        // secondary sidebar
                        if( !$rootScope.secondarySidebarPersistent && $rootScope.secondarySidebarActive && $event.keyCode == 27) {
                            hideSecondarySidebar();
                        }
                        // main search form
                        if( $rootScope.mainSearchActive && $event.keyCode == 27) {
                            hideMainSearch();
                        }
                        // style switcher
                        if( $rootScope.styleSwitcherActive && $event.keyCode == 27) {
                            $rootScope.styleSwitcherActive = false;
                        }
                        // sticky notes form
                        if( $rootScope.noteFormActive && $event.keyCode == 27) {
                            $rootScope.noteFormActive = false;
                        }
                    };

                }
            };
        }
    ])
    // main search show
    .directive('mainSearchShow', [
        '$rootScope',
        '$window',
        'variables',
        '$timeout',
        function ($rootScope, $window, variables, $timeout) {
            return {
                restrict: 'E',
                template: '<a id="main_search_btn" class="user_action_icon" ng-click="showSearch()"><i class="material-icons md-24 md-light">&#xE8B6;</i></a>',
                replace: true,
                scope: true,
                link: function(scope,el,attr) {
                    scope.showSearch = function() {

                        $('#header_main')
                            .children('.header_main_content')
                            .velocity("transition.slideUpBigOut", {
                                duration: 280,
                                easing: variables.easing_swiftOut,
                                begin: function() {
                                    $rootScope.mainSearchActive = true;
                                },
                                complete: function() {
                                    $('#header_main')
                                        .children('.header_main_search_form')
                                        .velocity("transition.slideDownBigIn", {
                                            duration: 280,
                                            easing: variables.easing_swiftOut,
                                            complete: function() {
                                                $('.header_main_search_input').focus();
                                            }
                                        })
                                }
                            });
                    };
                }
            };
        }
    ])
    // main search hide
    .directive('mainSearchHide', [
        '$rootScope',
        '$window',
        'variables',
        function ($rootScope, $window, variables) {
            return {
                restrict: 'E',
                template: '<i class="md-icon header_main_search_close material-icons" ng-click="hideSearch()">&#xE5CD;</i>',
                replace: true,
                scope: true,
                link: function(scope,el,attr) {
                    scope.hideSearch = function () {

                        var $header_main = $('#header_main');

                        $header_main
                            .children('.header_main_search_form')
                            .velocity("transition.slideUpBigOut", {
                                duration: 280,
                                easing: variables.easing_swiftOut,
                                begin: function() {
                                    $header_main.velocity("reverse");
                                    $rootScope.mainSearchActive = false;
                                },
                                complete: function() {
                                    $header_main
                                        .children('.header_main_content')
                                        .velocity("transition.slideDownBigIn", {
                                            duration: 280,
                                            easing: variables.easing_swiftOut,
                                            complete: function() {
                                                $('.header_main_search_input').blur().val('');
                                            }
                                        })
                                }
                            });

                    };
                }
            };
        }
    ])

    // primary sidebar
    .directive('sidebarPrimary', [
        '$rootScope',
        '$window',
        '$timeout',
        'variables',
        function ($rootScope, $window, $timeout,variables) {
            return {
                restrict: 'A',
                scope: 'true',
                link: function(scope,el,attr) {

                    var $sidebar_main = $('#sidebar_main');

                    scope.submenuToggle = function ($event) {
                        $event.preventDefault();

                        var $this = $($event.currentTarget),
                            slideToogle = $this.next('ul').is(':visible') ? 'slideUp' : 'slideDown';

                        $this.next('ul')
                            .velocity(slideToogle, {
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                begin: function() {
                                    if(slideToogle == 'slideUp') {
                                        $(this).closest('.submenu_trigger').removeClass('act_section')
                                    } else {
                                        if($rootScope.menuAccordionMode) {
                                            $this.closest('li').siblings('.submenu_trigger').each(function() {
                                                $(this).children('ul').velocity('slideUp', {
                                                    duration: 500,
                                                    easing: variables.easing_swiftOut,
                                                    begin: function() {
                                                        $(this).closest('.submenu_trigger').removeClass('act_section')
                                                    }
                                                })
                                            })
                                        }
                                        $(this).closest('.submenu_trigger').addClass('act_section')
                                    }
                                },
                                complete: function() {
                                    if(slideToogle !== 'slideUp') {
                                        var scrollContainer = $sidebar_main.find(".scroll-content").length ? $sidebar_main.find(".scroll-content") :  $sidebar_main.find(".scrollbar-inner");
                                        $this.closest('.act_section').velocity("scroll", {
                                            duration: 500,
                                            easing: variables.easing_swiftOut,
                                            container: scrollContainer
                                        });
                                    }
                                }
                            });
                    };

                    $rootScope.$watch('slimSidebarActive', function ( status ) {
                        if(status) {
                            var $body = $('body');
                            $sidebar_main
                                .mouseenter(function() {
                                    $body.removeClass('sidebar_slim_inactive');
                                    $body.addClass('sidebar_slim_active');
                                })
                                .mouseleave(function() {
                                    $body.addClass('sidebar_slim_inactive');
                                    $body.removeClass('sidebar_slim_active');
                                })
                       }
                    });

                }
            };
        }
    ])
    // toggle primary sidebar
    .directive('sidebarPrimaryToggle', [
        '$rootScope',
        '$window',
        '$timeout',
        function ($rootScope, $window, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template: '<a id="sSwitch_primary" href="#" class="sSwitch sSwitch_left" ng-click="togglePrimarySidebar($event)" ng-hide="miniSidebarActive || slimSidebarActive || topMenuActive"><span class="sSwitchIcon"></span></a>',
                link: function (scope, el, attrs) {
                    scope.togglePrimarySidebar = function ($event) {

                        $event.preventDefault();

                        if($rootScope.primarySidebarActive) {
                            $rootScope.primarySidebarHiding = true;
                            if($rootScope.largeScreen) {
                                $timeout(function() {
                                    $rootScope.primarySidebarHiding = false;
                                    $(window).resize();
                                },290);
                            }
                        } else {
                            if($rootScope.largeScreen) {
                                $timeout(function() {
                                    $(window).resize();
                                },290);
                            }
                        }

                        $rootScope.primarySidebarActive = !$rootScope.primarySidebarActive;

                        if( !$rootScope.largeScreen ) {
                            $rootScope.hide_content_sidebar = $rootScope.primarySidebarActive ? true : false;
                        }

                        if($rootScope.primarySidebarOpen) {
                            $rootScope.primarySidebarOpen = false;
                            $rootScope.primarySidebarActive = false;
                        }
                    };

                }
            };
        }
    ])
    // secondary sidebar
    .directive('sidebarSecondary', [
        '$rootScope',
        '$timeout',
        'variables',
        function ($rootScope,$timeout,variables) {
            return {
                restrict: 'A',
                link: function(scope,el,attrs) {
                    $rootScope.sidebar_secondary = true;
                    if(attrs.toggleHidden == 'large') {
                        $rootScope.secondarySidebarHiddenLarge = true;
                    }

                    // chat
                    var $sidebar_secondary = $(el);
                    if($sidebar_secondary.find('.md-list.chat_users').length) {

                        $('.md-list.chat_users').on('click', 'li', function() {
                            $('.md-list.chat_users').velocity("transition.slideRightBigOut", {
                                duration: 280,
                                easing: variables.easing_swiftOut,
                                complete: function() {
                                    $sidebar_secondary
                                        .find('.chat_box_wrapper')
                                        .addClass('chat_box_active')
                                        .velocity("transition.slideRightBigIn", {
                                            duration: 280,
                                            easing: variables.easing_swiftOut,
                                            begin: function() {
                                                $sidebar_secondary.addClass('chat_sidebar')
                                            }
                                        })
                                }
                            });
                        });

                        $sidebar_secondary
                            .find('.chat_sidebar_close')
                            .on('click',function() {
                                $sidebar_secondary
                                    .find('.chat_box_wrapper')
                                    .removeClass('chat_box_active')
                                    .velocity("transition.slideRightBigOut", {
                                        duration: 280,
                                        easing: variables.easing_swiftOut,
                                        complete: function () {
                                            $sidebar_secondary.removeClass('chat_sidebar');
                                            $('.md-list.chat_users').velocity("transition.slideRightBigIn", {
                                                duration: 280,
                                                easing: variables.easing_swiftOut
                                            })
                                        }
                                    })
                            });

                        if($sidebar_secondary.find('.uk-tab').length) {
                            $sidebar_secondary.find('.uk-tab').on('change.uk.tab',function(event, active_item, previous_item) {
                                if($(active_item).hasClass('chat_sidebar_tab') && $sidebar_secondary.find('.chat_box_wrapper').hasClass('chat_box_active')) {
                                    $sidebar_secondary.addClass('chat_sidebar')
                                } else {
                                    $sidebar_secondary.removeClass('chat_sidebar')
                                }
                            })
                        }
                    }

                }
            };
        }
    ])
    // toggle secondary sidebar
    .directive('sidebarSecondaryToggle', [
        '$rootScope',
        '$window',
        '$timeout',
        function ($rootScope, $window, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                template: '<a href="#" id="sSwitch_secondary" class="sSwitch sSwitch_right" ng-show="sidebar_secondary" ng-click="toggleSecondarySidebar($event)"><span class="sSwitchIcon"></span></a>',
                link: function (scope, el, attrs) {
                    scope.toggleSecondarySidebar = function ($event) {
                        $event.preventDefault();
                        $rootScope.secondarySidebarActive = !$rootScope.secondarySidebarActive;
                    };
                }
            };
        }
    ])
    // activate card fullscreen
    .directive('cardFullscreenActivate', [
        '$rootScope',
        'variables',
        function ($rootScope, variables) {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template: '<i class="md-icon material-icons md-card-fullscreen-activate" ng-click="cardFullscreenActivate($event)">&#xE5D0;</i>',
                link: function (scope, el, attrs) {
                    scope.cardFullscreenActivate = function ($event) {
                        $event.preventDefault();

                        var $thisCard = $(el).closest('.md-card'),
                            mdCardToolbarFixed = $thisCard.hasClass('toolbar-fixed'),
                            mdCard_h = $thisCard.height(),
                            mdCard_w = $thisCard.width(),
                            body_scroll_top = $('body').scrollTop(),
                            mdCard_offset = $thisCard.offset();

                        // create placeholder for card
                        $thisCard.after('<div class="md-card-placeholder" style="width:'+ mdCard_w+'px;height:'+ mdCard_h+'px;"/>');
                        // add overflow hidden to #page_content (fix for ios)
                        //$body.addClass('md-card-fullscreen-active');
                        // add width/height to card (preserve original size)
                        $thisCard
                            .addClass('md-card-fullscreen')
                            .css({
                                'width': mdCard_w,
                                'height': mdCard_h,
                                'left': mdCard_offset.left,
                                'top': mdCard_offset.top - body_scroll_top
                            })
                            // animate card to top/left position
                            .velocity({
                                left: 0,
                                top: 0
                            },{
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                begin: function(elements) {
                                    $rootScope.card_fullscreen = true;
                                    $rootScope.hide_content_sidebar = true;
                                    // add back button
                                    //$thisCard.find('.md-card-toolbar').prepend('<span class="md-icon md-card-fullscreen-deactivate material-icons uk-float-left">&#xE5C4;</span>');
                                    //cllc_page_content.hide_content_sidebar();
                                }
                            })
                            // resize card to full width/height
                            .velocity({
                                height: '100%',
                                width: '100%'
                            },{
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                complete: function(elements) {
                                    // activate onResize callback for some js plugins
                                    //$(window).resize();
                                    // show fullscreen content
                                    $thisCard.find('.md-card-fullscreen-content').velocity("transition.slideUpBigIn", {
                                        duration: 400,
                                        easing: variables.easing_swiftOut,
                                        complete: function(elements) {
                                            // activate onResize callback for some js plugins
                                            $(window).resize();
                                        }
                                    });
                                    if(mdCardToolbarFixed) {
                                        $thisCard.addClass('mdToolbar_fixed')
                                    }
                                }
                            });
                    }
                }
            }
        }
    ])
    // deactivate card fullscreen
    .directive('cardFullscreenDeactivate', [
        '$rootScope',
        '$window',
        'variables',
        function ($rootScope, $window, variables) {
            return {
                restrict: 'E',
                replace: true,
                template: '<span class="md-icon md-card-fullscreen-deactivate material-icons uk-float-left" ng-show="card_fullscreen" ng-click="cardFullscreenDeactivate($event)">&#xE5C4;</span>',
                link: function (scope, el, attrs) {
                    scope.cardFullscreenDeactivate = function ($event) {
                        $event.preventDefault();

                        // get card placeholder width/height and offset
                        var $thisPlaceholderCard = $('.md-card-placeholder'),
                            mdPlaceholderCard_h = $thisPlaceholderCard.height(),
                            mdPlaceholderCard_w = $thisPlaceholderCard.width(),
                            body_scroll_top = $('body').scrollTop(),
                            mdPlaceholderCard_offset_top = $thisPlaceholderCard.offset().top - body_scroll_top,
                            mdPlaceholderCard_offset_left = $thisPlaceholderCard.offset().left,
                            $thisCard = $('.md-card-fullscreen'),
                            mdCardToolbarFixed = $thisCard.hasClass('toolbar-fixed');

                        $thisCard
                            // resize card to original size
                            .velocity({
                                height: mdPlaceholderCard_h,
                                width: mdPlaceholderCard_w
                            },{
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                begin: function(elements) {
                                    // hide fullscreen content
                                    $thisCard.find('.md-card-fullscreen-content').velocity("transition.slideDownOut",{ duration: 280, easing: variables.easing_swiftOut });
                                    $rootScope.card_fullscreen = false;
                                    if(mdCardToolbarFixed) {
                                        $thisCard.removeClass('mdToolbar_fixed')
                                    }
                                },
                                complete: function(elements) {
                                    $rootScope.hide_content_sidebar = false;
                                }
                            })
                            // move card to original position
                            .velocity({
                                left: mdPlaceholderCard_offset_left,
                                top: mdPlaceholderCard_offset_top
                            },{
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                complete: function(elements) {
                                    // remove some styles added by velocity.js
                                    $thisCard.removeClass('md-card-fullscreen').css({
                                        width: '',
                                        height: '',
                                        left: '',
                                        top: ''
                                    });
                                    // remove card placeholder
                                    $thisPlaceholderCard.remove();
                                    $(window).resize();
                                }
                            })

                    }
                }
            }
        }
    ])
    // fullscren on card click
    .directive('cardFullscreenWhole', [
        '$rootScope',
        'variables',
        function ($rootScope, variables) {
            return {
                restrict: 'A',
                replace: true,
                scope: true,
                link: function (scope, el, attrs) {

                    $(el).on('click',function(e) {
                        e.preventDefault();
                        var $this = $(this);
                        if(!$this.hasClass('md-card-fullscreen')) {
                            scope.cardFSActivate();
                        }
                    });

                    $(el).on('click','.cardFSDeactivate',function(e) {
                        e.preventDefault();
                        var $this = $(this);
                        if(!$this.hasClass('md-card-fullscreen')) {
                            scope.cardFSDeactivate();
                        }
                    });

                    scope.cardFSActivate = function () {
                        var $thisCard = $(el),
                            mdCardToolbarFixed = $thisCard.hasClass('toolbar-fixed'),
                            mdCard_h = $thisCard.height(),
                            mdCard_w = $thisCard.width(),
                            body_scroll_top = $('body').scrollTop(),
                            mdCard_offset = $thisCard.offset();

                        // create placeholder for card
                        $thisCard.after('<div class="md-card-placeholder" style="width:'+ mdCard_w+'px;height:'+ mdCard_h+'px;"/>');
                        // add width/height to card (preserve original size)
                        $thisCard
                            .addClass('md-card-fullscreen')
                            .css({
                                'width': mdCard_w,
                                'height': mdCard_h
                            })
                            // animate card to top/left position
                            .velocity({
                                left: 0,
                                top: 0
                            },{
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                begin: function(elements) {
                                    $rootScope.card_fullscreen = true;
                                    $rootScope.hide_content_sidebar = true;
                                    // add back button
                                    $thisCard.append('<span class="md-icon material-icons uk-position-top-right cardFSDeactivate" style="margin:10px 10px 0 0">&#xE5CD;</span>')
                                }
                            })
                            // resize card to full width/height
                            .velocity({
                                height: '100%',
                                width: '100%'
                            }, {
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                complete: function(elements) {
                                    // show fullscreen content
                                    $thisCard.find('.md-card-fullscreen-content').velocity("transition.slideUpBigIn", {
                                        duration: 400,
                                        easing: variables.easing_swiftOut,
                                        complete: function(elements) {
                                            // activate onResize callback for some js plugins
                                            $(window).resize();
                                        }
                                    });
                                    if(mdCardToolbarFixed) {
                                        $thisCard.addClass('mdToolbar_fixed')
                                    }
                                }
                            });
                    };
                    scope.cardFSDeactivate = function () {
                        // get card placeholder width/height and offset
                        var $thisPlaceholderCard = $('.md-card-placeholder'),
                            mdPlaceholderCard_h = $thisPlaceholderCard.height(),
                            mdPlaceholderCard_w = $thisPlaceholderCard.width(),
                            mdPlaceholderCard_offset_top = $thisPlaceholderCard.offset().top,
                            mdPlaceholderCard_offset_left = $thisPlaceholderCard.offset().left,
                            $thisCard = $('.md-card-fullscreen'),
                            mdCardToolbarFixed = $thisCard.hasClass('toolbar-fixed');

                        $thisCard
                        // resize card to original size
                            .velocity({
                                height: mdPlaceholderCard_h,
                                width: mdPlaceholderCard_w
                            },{
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                begin: function(elements) {
                                    // hide fullscreen content
                                    $thisCard.find('.md-card-fullscreen-content').velocity("transition.slideDownOut",{ duration: 280, easing: variables.easing_swiftOut });
                                    $rootScope.card_fullscreen = false;
                                    if(mdCardToolbarFixed) {
                                        $thisCard.removeClass('mdToolbar_fixed')
                                    }
                                    $thisCard.find('.cardFSDeactivate').remove();
                                },
                                complete: function(elements) {
                                    $rootScope.hide_content_sidebar = false;
                                }
                            })
                            // move card to original position
                            .velocity({
                                left: mdPlaceholderCard_offset_left,
                                top: mdPlaceholderCard_offset_top
                            },{
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                complete: function(elements) {
                                    // remove some styles added by velocity.js
                                    $thisCard.removeClass('md-card-fullscreen').css({
                                        width: '',
                                        height: '',
                                        left: '',
                                        top: ''
                                    });
                                    // remove card placeholder
                                    $thisPlaceholderCard.remove();
                                    $(window).resize();
                                }
                            })

                    };
                }
            }
        }
    ])
    // card close
    .directive('cardClose', [
        'utils',
        function (utils) {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template: '<i class="md-icon material-icons md-card-close" ng-click="cardClose($event)">&#xE14C;</i>',
                link: function (scope, el, attrs) {
                    scope.cardClose = function ($event) {
                        $event.preventDefault();

                        var $this = $(el),
                            thisCard = $this.closest('.md-card'),
                            removeCard = function() {
                                $(thisCard).remove();
                                $(window).resize();
                            };

                        utils.card_show_hide(thisCard,undefined,removeCard);

                    }
                }
            }
        }
    ])
    // card toggle
    .directive('cardToggle', [
        'variables',
        function (variables) {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template: '<i class="md-icon material-icons md-card-toggle" ng-click="cardToggle($event)">&#xE316;</i>',
                link: function (scope, el, attrs) {

                    scope.cardToggle = function ($event) {
                        $event.preventDefault();

                        var $this = $(el),
                            thisCard = $this.closest('.md-card');

                        $(thisCard).toggleClass('md-card-collapsed').children('.md-card-content').slideToggle('280', variables.bez_easing_swiftOut);

                        $this.velocity({
                            scale: 0,
                            opacity: 0.2
                        }, {
                            duration: 280,
                            easing: variables.easing_swiftOut,
                            complete: function() {
                                $(thisCard).hasClass('md-card-collapsed') ? $this.html('&#xE313;') : $this.html('&#xE316;');
                                $this.velocity('reverse');
                                $(window).resize();
                            }
                        });
                    };

                    // hide card content on page load
                    var thisCard = $(el).closest('.md-card');
                    if(thisCard.hasClass('md-card-collapsed')) {
                        var $this_toggle = thisCard.find('.md-card-toggle');

                        $this_toggle.html('&#xE313;');
                        thisCard.children('.md-card-content').hide();
                    }

                }
            }
        }
    ])
    // card overlay toggle
    .directive('cardOverlayToggle', [
        function () {
            return {
                restrict: 'E',
                template: '<i class="md-icon material-icons" ng-click="toggleOverlay($event)">&#xE5D4;</i>',
                replace: true,
                scope: true,
                link: function (scope, el, attrs) {

                    if(el.closest('.md-card').hasClass('md-card-overlay-active')) {
                        el.html('&#xE5CD;')
                    }

                    scope.toggleOverlay = function ($event) {

                        $event.preventDefault();

                        if(!el.closest('.md-card').hasClass('md-card-overlay-active')) {
                            el
                                .html('&#xE5CD;')
                                .closest('.md-card').addClass('md-card-overlay-active');

                        } else {
                            el
                                .html('&#xE5D4;')
                                .closest('.md-card').removeClass('md-card-overlay-active');
                        }

                    }
                }
            }
        }
    ])
    // card toolbar progress
    .directive('cardProgress', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, el, attrs) {

                    var $this = $(el).children('.md-card-toolbar'),
                        bg_percent = parseInt(attrs.cardProgress);


                    function updateCard(percent) {
                        var bg_color_default = $this.attr('card-bg-default');

                        var bg_color = !bg_color_default ? $this.css('backgroundColor') : bg_color_default;
                        if(!bg_color_default) {
                            $this.attr('card-bg-default',bg_color)
                        }

                        $this
                            .css({ 'background': '-moz-linear-gradient(left, '+bg_color+' '+percent+'%, #fff '+(percent)+'%)'})
                            .css({ 'background': '-webkit-linear-gradient(left, '+bg_color+' '+percent+'%, #fff '+(percent)+'%)'})
                            .css({ 'background': 'linear-gradient(to right,  '+bg_color+' '+percent+'%, #fff '+(percent)+'%)'});


                        scope.cardPercentage = percent;
                    }

                    updateCard(bg_percent);

                    scope.$watch(function() {
                        return $(el).attr('card-progress')
                    }, function(newValue) {
                        updateCard(newValue);
                    });

                }
            }
        }
    ])
    // custom scrollbar
    .directive('customScrollbar', [
        '$rootScope',
        '$timeout',
        function ($rootScope,$timeout) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, el, attrs) {

                    // check if mini sidebar is enabled
                    if(attrs['id'] == 'sidebar_main' && $rootScope.miniSidebarActive) {
                        return;
                    }

                    $(el)
                        .addClass('uk-height-1-1')
                        .wrapInner("<div class='scrollbar-inner'></div>");

                    if(Modernizr.touch) {
                        $(el).children('.scrollbar-inner').addClass('touchscroll');
                    } else {
                        $timeout(function() {
                            $(el).children('.scrollbar-inner').scrollbar({
                                //disableBodyScroll: true,
                                scrollx: false,
                                duration: 100
                            });
                        })
                    }

                }
            }
        }
    ])
    // material design inputs
    .directive('mdInput',[
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                scope: {
                    ngModel: '='
                },
                controller: function ($scope,$element) {
                    var $elem = $($element);
                    $scope.updateInput = function() {
                        // clear wrapper classes
                        $elem.closest('.uk-input-group').removeClass('uk-input-group-danger uk-input-group-success');
                        $elem.closest('.md-input-wrapper').removeClass('md-input-wrapper-danger md-input-wrapper-success md-input-wrapper-disabled');

                        if($elem.hasClass('md-input-danger')) {
                            if($elem.closest('.uk-input-group').length) {
                                $elem.closest('.uk-input-group').addClass('uk-input-group-danger')
                            }
                            $elem.closest('.md-input-wrapper').addClass('md-input-wrapper-danger')
                        }
                        if($elem.hasClass('md-input-success')) {
                            if($elem.closest('.uk-input-group').length) {
                                $elem.closest('.uk-input-group').addClass('uk-input-group-success')
                            }
                            $elem.closest('.md-input-wrapper').addClass('md-input-wrapper-success')
                        }
                        if($elem.prop('disabled')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-wrapper-disabled')
                        }
                        if($elem.hasClass('label-fixed')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-filled')
                        }
                        if($elem.val() != '') {
                            $elem.closest('.md-input-wrapper').addClass('md-input-filled')
                        }
                    };
                },
                link: function (scope, elem, attrs) {

                    var $elem = $(elem);

                    $timeout(function() {
                        if(!$elem.hasClass('md-input-processed')) {

                            var extraClass = '';
                            if($elem.is('[class*="uk-form-width-"]')) {
                                var elClasses = $elem.attr('class').split (' ');
                                for(var i = 0; i < elClasses.length; i++){
                                    var classPart = elClasses[i].substr(0,14);
                                    if(classPart == "uk-form-width-"){
                                        var extraClass = elClasses[i];
                                    }
                                }
                            }

                            if ($elem.prev('label').length) {
                                $elem.prev('label').andSelf().wrapAll('<div class="md-input-wrapper"/>');
                            } else if ($elem.siblings('[data-uk-form-password]').length) {
                                $elem.siblings('[data-uk-form-password]').andSelf().wrapAll('<div class="md-input-wrapper"/>');
                            } else {
                                $elem.wrap('<div class="md-input-wrapper"/>');
                            }
                            $elem
                                .addClass('md-input-processed')
                                .closest('.md-input-wrapper')
                                .append('<span class="md-input-bar '+extraClass+'"/>');
                        }

                        scope.updateInput();

                    });

                    scope.$watch(function() {
                        return $elem.attr('class'); },
                        function(newValue,oldValue){
                            if(newValue != oldValue) {
                                scope.updateInput();
                            }
                        }
                    );

                    scope.$watch(function() {
                        return $elem.val(); },
                        function(newValue,oldValue){
                            if( !$elem.is(':focus') && (newValue != oldValue) ) {
                                scope.updateInput();
                            }
                        }
                    );

                    $elem
                        .on('focus', function() {
                            $elem.closest('.md-input-wrapper').addClass('md-input-focus')
                        })
                        .on('blur', function() {
                            $timeout(function() {
                                $elem.closest('.md-input-wrapper').removeClass('md-input-focus');
                                if($elem.val() == '') {
                                    $elem.closest('.md-input-wrapper').removeClass('md-input-filled')
                                } else {
                                    $elem.closest('.md-input-wrapper').addClass('md-input-filled')
                                }
                            },100)
                        });

                }
            }
        }
    ])
    // material design fab speed dial
    .directive('mdFabSpeedDial',[
        'variables',
        '$timeout',
        function (variables,$timeout) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {

                    var $elem = $(elem),
                        $wrapper = $(elem).closest('.md-fab-speed-dial,.md-fab-speed-dial-horizontal');

                    function activateFAB(obj) {
                        obj.closest('.md-fab-wrapper').addClass('md-fab-active');
                        obj.velocity({
                            scale: 0
                        }, {
                            duration: 140,
                            easing: variables.easing_swiftOut,
                            complete: function() {
                                obj
                                    .velocity({ scale: 1 },{
                                        duration: 140,
                                        easing: variables.easing_swiftOut
                                    })
                                    .children().toggle()
                            }
                        })
                    }
                    function deactivateFAB(obj) {
                        obj.closest('.md-fab-wrapper').removeClass('md-fab-active');
                        obj.velocity({
                            scale: 0
                        }, {
                            duration: 140,
                            easing: variables.easing_swiftOut,
                            complete: function() {
                                obj
                                    .velocity({ scale: 1 },{
                                        duration: 140,
                                        easing: variables.easing_swiftOut
                                    })
                                    .children().toggle()
                            }
                        })
                    }

                    $(elem).append('<i class="material-icons md-fab-action-close" style="display:none">&#xE5CD;</i>');

                    if($wrapper.is('[data-fab-hover]')) {
                        var deactiveateFabTimeout;
                        $wrapper
                            .on('mouseenter',function() {
                                $wrapper.addClass('md-fab-over');
                                $timeout.cancel(deactiveateFabTimeout);
                                setTimeout(function() {
                                    activateFAB($elem);
                                },100);
                            })
                            .on('mouseleave',function() {
                                deactivateFAB($elem);
                                deactiveateFabTimeout = $timeout(function() {
                                    $wrapper.removeClass('md-fab-over');
                                },500);
                            })
                    } else {
                        $elem
                            .on('click',function() {
                                if(!$elem.closest('.md-fab-wrapper').hasClass('md-fab-active')) {
                                    activateFAB($elem);
                                } else {
                                    deactivateFAB($elem);
                                }
                            })
                            .closest('.md-fab-wrapper').find('.md-fab-small')
                            .on('click',function() {
                                deactivateFAB($elem);
                            });
                    }
                    /*$(elem)
                        .append('<i class="material-icons md-fab-action-close" style="display:none">&#xE5CD;</i>')
                        .on('click',function(e) {
                            e.preventDefault();

                            var $this = $(this),
                                $this_wrapper = $this.closest('.md-fab-wrapper');

                            if(!$this_wrapper.hasClass('md-fab-active')) {
                                $this_wrapper.addClass('md-fab-active');
                            } else {
                                $this_wrapper.removeClass('md-fab-active');
                            }

                            $this.velocity({
                                scale: 0
                            },{
                                duration: 140,
                                easing: variables.easing_swiftOut,
                                complete: function() {
                                    $this.children().toggle();
                                    $this.velocity({
                                        scale: 1
                                    },{
                                        duration: 140,
                                        easing: variables.easing_swiftOut
                                    })
                                }
                            })
                        })
                        .closest('.md-fab-wrapper').find('.md-fab-small')
                        .on('click',function() {
                            $(elem).trigger('click');
                        });*/
                }
            }
        }
    ])
    // material design fab toolbar
    .directive('mdFabToolbar',[
        'variables',
        '$document',
        function (variables,$document) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {

                    var $fab_toolbar = $(elem);

                    $fab_toolbar
                        .children('i')
                        .on('click', function(e) {
                            e.preventDefault();

                            var toolbarItems = $fab_toolbar.children('.md-fab-toolbar-actions').children().length;

                            $fab_toolbar.addClass('md-fab-animated');

                            var FAB_padding = !$fab_toolbar.hasClass('md-fab-small') ? 16 : 24,
                                FAB_size = !$fab_toolbar.hasClass('md-fab-small') ? 64 : 44;

                            setTimeout(function() {
                                $fab_toolbar
                                    .width((toolbarItems*FAB_size + FAB_padding))
                            },140);

                            setTimeout(function() {
                                $fab_toolbar.addClass('md-fab-active');
                            },420);

                        });

                    $($document).on('click scroll', function(e) {
                        if( $fab_toolbar.hasClass('md-fab-active') ) {
                            if (!$(e.target).closest($fab_toolbar).length) {

                                $fab_toolbar
                                    .css('width','')
                                    .removeClass('md-fab-active');

                                setTimeout(function() {
                                    $fab_toolbar.removeClass('md-fab-animated');
                                },140);

                            }
                        }
                    });
                }
            }
        }
    ])
    // material design fab sheet
    .directive('mdFabSheet',[
        'variables',
        '$document',
        function (variables,$document) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {
                    var $fab_sheet = $(elem);

                    $fab_sheet
                        .children('i')
                        .on('click', function(e) {
                            e.preventDefault();

                            var sheetItems = $fab_sheet.children('.md-fab-sheet-actions').children('a').length;

                            $fab_sheet.addClass('md-fab-animated');

                            setTimeout(function() {
                                $fab_sheet
                                    .width('240px')
                                    .height(sheetItems*40 + 8);
                            },140);

                            setTimeout(function() {
                                $fab_sheet.addClass('md-fab-active');
                            },280);

                        });

                    $($document).on('click scroll', function(e) {
                        if( $fab_sheet.hasClass('md-fab-active') ) {
                            if (!$(e.target).closest($fab_sheet).length) {

                                $fab_sheet
                                    .css({
                                        'height':'',
                                        'width':''
                                    })
                                    .removeClass('md-fab-active');

                                setTimeout(function() {
                                    $fab_sheet.removeClass('md-fab-animated');
                                },140);

                            }
                        }
                    });
                }
            }
        }
    ])
    // hierarchical show
    .directive('hierarchicalShow', [
        '$timeout',
        '$rootScope',
        function ($timeout,$rootScope) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {


                    var parent_el = $(elem),
                        baseDelay = 60;


                    var add_animation = function(children,length) {
                        children
                            .each(function(index) {
                                $(this).css({
                                    '-webkit-animation-delay': (index * baseDelay) + "ms",
                                    'animation-delay': (index * baseDelay) + "ms"
                                })
                            })
                            .end()
                            .waypoint({
                                element: elem[0],
                                handler: function() {
                                    parent_el.addClass('hierarchical_show_inView');
                                    setTimeout(function() {
                                        parent_el
                                            .removeClass('hierarchical_show hierarchical_show_inView fast_animation')
                                            .children()
                                            .css({
                                                '-webkit-animation-delay': '',
                                                'animation-delay': ''
                                            });
                                    }, (length*baseDelay)+1200 );
                                    this.destroy();
                                },
                                context: window,
                                offset: '90%'
                            });
                    };

                    $rootScope.$watch('pageLoaded',function() {
                       if($rootScope.pageLoaded) {
                           var children = parent_el.children(),
                               children_length = children.length;

                           $timeout(function() {
                               add_animation(children,children_length)
                           },560)

                       }
                    });

                    scope.$watch(function() {
                        return parent_el.hasClass('hierarchical_show');
                    }, function(newValue){
                        if($rootScope.pageLoaded && newValue) {
                            var children = parent_el.children(),
                                children_length = children.length;
                            add_animation(children,children_length);
                        }
                    });


                }
            }
        }
    ])
    // hierarchical slide in
    .directive('hierarchicalSlide', [
        '$timeout',
        '$rootScope',
        function ($timeout,$rootScope) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {

                    var $this = $(elem),
                        baseDelay = 100;

                    var add_animation = function(children,context,childrenLength) {
                        children.each(function(index) {
                            $(this).css({
                                '-webkit-animation-delay': (index * baseDelay) + "ms",
                                'animation-delay': (index * baseDelay) + "ms"
                            })
                        });
                        $this.waypoint({
                            handler: function() {
                                $this.addClass('hierarchical_slide_inView');
                                $timeout(function() {
                                    $this.removeClass('hierarchical_slide hierarchical_slide_inView');
                                    children.css({
                                        '-webkit-animation-delay': '',
                                        'animation-delay': ''
                                    });
                                }, (childrenLength*baseDelay)+1200 );
                                this.destroy();
                            },
                            context: context[0],
                            offset: '90%'
                        });
                    };

                    $rootScope.$watch('pageLoaded',function() {
                        if($rootScope.pageLoaded) {
                            var thisChildren = attrs['slideChildren'] ? $this.children(attrs['slideChildren']) : $this.children(),
                                thisContext = attrs['slideContext'] ? $this.closest(attrs['slideContext']) : 'window',
                                thisChildrenLength = thisChildren.length;

                            if(thisChildrenLength >= 1) {
                                $timeout(function() {
                                    add_animation(thisChildren,thisContext,thisChildrenLength)
                                },560)
                            }
                        }
                    });

                    scope.$watch(function() {
                        return $this.hasClass('hierarchical_slide');
                    }, function(newValue){
                        if($rootScope.pageLoaded && newValue) {
                            var thisChildren = attrs['slideChildren'] ? $this.children(attrs['slideChildren']) : $this.children(),
                                thisContext = attrs['slideContext'] ? $this.closest(attrs['slideContext']) : 'window',
                                thisChildrenLength = thisChildren.length;

                            add_animation(thisChildren,thisContext,thisChildrenLength);
                        }
                    });

                }
            }
        }
    ])
    // preloaders
    .directive('mdPreloader',[
        function () {
            return {
                restrict: 'E',
                scope: {
                    width: '=?',
                    height: '=?',
                    strokeWidth: '=?',
                    style: '@?'
                },
                template: '<div class="md-preloader{{style}}"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" ng-attr-height="{{ height }}" ng-attr-width="{{ width }}" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" ng-attr-stroke-width="{{ strokeWidth }}"/></svg></div>',
                link: function (scope, elem, attr) {

                    scope.width = scope.width ? scope.width : 48;
                    scope.height = scope.height ? scope.height : 48;
                    scope.strokeWidth = scope.strokeWidth ? scope.strokeWidth : 4;

                    attr.$observe('warning', function() {
                        scope.style = ' md-preloader-warning'
                    });

                    attr.$observe('success', function() {
                        scope.style = ' md-preloader-success'
                    });

                    attr.$observe('danger', function() {
                        scope.style = ' md-preloader-danger'
                    });

                }
            }
        }
    ])
    .directive('preloader',[
        '$rootScope',
        'utils',
        function ($rootScope,utils) {
            return {
                restrict: 'E',
                scope: {
                    width: '=?',
                    height: '=?',
                    style: '@?'
                },
                template: '<img src="assets/img/spinners/{{style}}{{imgDensity}}.gif" alt="" ng-attr-width="{{width}}" ng-attr-height="{{height}}">',
                link: function (scope, elem, attrs) {

                    scope.width = scope.width ? scope.width : 32;
                    scope.height = scope.height ? scope.height : 32;
                    scope.style = scope.style ? scope.style : 'spinner';
                    scope.imgDensity = utils.isHighDensity() ? '@2x' : '' ;

                    attrs.$observe('warning', function() {
                        scope.style = 'spinner_warning'
                    });

                    attrs.$observe('success', function() {
                        scope.style = 'spinner_success'
                    });

                    attrs.$observe('danger', function() {
                        scope.style = 'spinner_danger'
                    });

                    attrs.$observe('small', function() {
                        scope.style = 'spinner_small'
                    });

                    attrs.$observe('medium', function() {
                        scope.style = 'spinner_medium'
                    });

                    attrs.$observe('large', function() {
                        scope.style = 'spinner_large'
                    });

                }
            }
        }
    ])
    // uikit components
    .directive('ukHtmlEditor',[
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    $timeout(function() {
                        UIkit.htmleditor(elem[0], {
                            'toolbar': '',
                            'height': '240'
                        });
                    });
                }
            }
        }
    ])
    .directive('ukNotification',[
        '$window',
        function ($window) {
            return {
                restrict: 'A',
                scope: {
                    message: '@',
                    status: '@?',
                    timeout: '@?',
                    group: '@?',
                    position: '@?',
                    callback: '&?'
                },
                link: function (scope, elem, attrs) {

                    var w = angular.element($window),
                        $element = $(elem);

                    scope.showNotify = function() {
                        var thisNotify = UIkit.notify({
                            message: scope.message,
                            status: scope.status ? scope.status : '',
                            timeout: scope.timeout ? scope.timeout : 5000,
                            group: scope.group ? scope.group : '',
                            pos: scope.position ? scope.position : 'top-center',
                            onClose: function() {
                                $('body').find('.md-fab-wrapper').css('margin-bottom','');
                                clearTimeout(thisNotify.timeout);

                                if(scope.callback) {
                                    if( angular.isFunction(scope.callback()) ) {
                                        scope.$apply(scope.callback());
                                    } else {
                                        console.log('Callback is not a function');
                                    }
                                }

                            }
                        });
                        if(
                            ( (w.width() < 768) && (
                                (scope.position == 'bottom-right')
                                || (scope.position == 'bottom-left')
                                || (scope.position == 'bottom-center')
                            ) )
                            || (scope.position == 'bottom-right')
                        ) {
                            var thisNotify_height = $(thisNotify.element).outerHeight(),
                                spacer = (w.width() < 768) ? -6 : 8;
                            $('body').find('.md-fab-wrapper').css('margin-bottom',thisNotify_height + spacer);
                        }
                    };

                    $element.on("click", function(){
                        if($('body').find('.uk-notify-message').length) {
                            $('body').find('.uk-notify-message').click();
                            setTimeout(function() {
                                scope.showNotify()
                            },450)
                        } else {
                            scope.showNotify()
                        }
                    });

                }
            }
        }
    ])
    .directive('accordionSectionOpen',[
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var sectOpen = attrs.accordionSectionOpen.toString().split(","),
                        $elem = $(elem);
                    $timeout(function() {
                        var data = $(elem).data();
                        // close all accordion sections
                        $elem.children('.uk-accordion-title.uk-active').each(function() {
                            $(this).trigger('click');
                        })
                        if(!data.accordion.options.collapse && (sectOpen.length > 1)) {
                            // open multiple sections
                            for(var $i = 0;$i <= sectOpen.length;$i++) {
                                $elem.children('.uk-accordion-title').eq(sectOpen[$i] - 1).trigger('click')
                            }
                        } else {
                            $elem.children('.uk-accordion-title').eq(sectOpen[0] - 1).trigger('click')
                        }
                    },220);
                }
            }
        }
    ])
    .directive('pageAside', [
        '$timeout',
        '$window',
        function ($timeout,$window) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var w = angular.element($window);

                    function calculateHeight() {
                        var viewportHeight = w.height(),
                            asideTop = $(elem).offset().top;

                        $(elem).height(viewportHeight - asideTop);
                    }
                    calculateHeight();
                    w.on('debouncedresize',function() {
                        calculateHeight();
                    });
                }
            }
        }
    ])
    .directive('pageAsideToggle', [
        '$timeout',
        '$window',
        function ($timeout,$window) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    $(elem).on('click',function() {
                        $('body').toggleClass('page_aside_collapsed');
                    })
                }
            }
        }
    ])
    .directive('pageOverflow', [
        '$timeout',
        '$window',
        function ($timeout,$window) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var w = angular.element($window);

                    function calculateHeight() {
                        var viewportHeight = w.height(),
                            overflowTop = $(elem).offset().top,
                            height = viewportHeight - overflowTop;

                        if($(elem).children('.uk-overflow-container').length) {
                            $(elem).children('.uk-overflow-container').height(height);
                        } else {
                            $(elem).height(height);
                        }

                    }
                    calculateHeight();
                    w.on('debouncedresize',function() {
                        calculateHeight();
                    });

                }
            }
        }
    ])
    .directive('cllcUiSelect', [
        '$timeout',
        function($timeout) {
            return {
                require: 'uiSelect',
                link: function(scope, element, attrs, $select) {

                    $timeout(function() {
                        scope.dropdown = $($select.$element).find('.ui-select-dropdown')
                    },1000);

                    scope.onOpenClose = function(isOpen) {
                        var $dropdown = scope.dropdown;
                        if(isOpen) {
                            $dropdown
                                .hide()
                                .velocity('slideDown', {
                                    duration: 200,
                                    easing: [ 0.4,0,0.2,1 ]
                                })
                        } else {
                            scope.dropdown
                                .show()
                                .velocity('slideUp', {
                                    duration: 200,
                                    easing: [ 0.4,0,0.2,1 ]
                                });
                        }
                    };

                }
            };
        }
    ])
    .directive('maskedInput', [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {

                    var $this = $(elem);

                    $timeout(function () {
                        $this.inputmask();
                    })

                }
            };
        }
    ])
;
hrmsApp
    .filter('multiSelectFilter', function () {
        return function (items, filterData) {
            if(filterData == undefined)
                return items;
            var keys = Object.keys(filterData);
            var filtered = [];
            var populate = true;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                populate = true;
                for(var j = 0; j < keys.length ; j++){
                    if(filterData[keys[j]] != undefined){
                        if(filterData[keys[j]].length == 0 || filterData[keys[j]].contains(item[keys[j]])){
                            populate = true;
                        } else {
                            populate = false;
                            break;
                        }
                    }
                }
                if(populate){
                    filtered.push(item);
                }
            }
            return filtered;
        };
    })
    .filter("jsonDate", function() {
        return function(x) {
            if(x) return new Date(x);
            else return null;
        };
    })
    .filter("momentDate", function() {
        return function(x,date_format_i,date_format_o) {
            if(x) {
                if(date_format_i) {
                    return moment(x, date_format_i).format(date_format_o)
                } else {
                    return moment(new Date(x)).format(date_format_o)
                }
            }
            else return null;
        };
    })
    .filter("initials", function() {
        return function(x) {
            if(x) {
                return x.split(' ').map(function (s) {
                    return s.charAt(0);
                }).join('');
            } else {
                return null;
            }
        };
    })
    .filter('reverseOrder', function() {
        return function(items) {
            return items.slice().reverse();
        };
    })
    .filter("trust", ['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        }
    }])
;
hrmsApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $locationProvider.hashPrefix('');

            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                .when('/', '/')
                .otherwise('/');

            $stateProvider
            // -- ERROR PAGES --
                .state("error", {
                    url: "/error",
                    templateUrl: 'app/views/error.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit'
                            ]);
                        }]
                    }
                })
                .state("error.404", {
                    url: "/404",
                    templateUrl: 'app/components/pages/error_404View.html'
                })
                .state("error.500", {
                    url: "/500",
                    templateUrl: 'app/components/pages/error_500View.html'
                })
                // -- LOGIN PAGE --
                .state('login', {
                    url: "/",
                    templateUrl: 'app/components/general/customeloginView.html',
                    controller: 'loginCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_iCheck',
                                'lazy_parsleyjs',
                                'app/components/general/loginController.js'
                            ]);
                        }]
                    }
                })
                // -- RESTRICTED --
                .state("restricted", {
                    abstract: true,
                    url: "",
                    templateUrl: 'app/views/restricted.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_selectizeJS',
                                'lazy_switchery',
                                'lazy_prismJS',
                                'lazy_autosize',
                                'lazy_iCheck',
                                'lazy_themes'
                            ]);
                        }]
                    }
                })
                .state("restricted.dashboard", {
                    url: "/dashboard",
                    templateUrl: 'app/components/dashboard/dashboardView.html',
                    controller: 'dashboardCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                // ocLazyLoad config (app/app.js)
                                'lazy_countUp',
                                'lazy_charts_peity',
                                'lazy_charts_easypiechart',
                                'lazy_charts_metricsgraphics',
                                'lazy_charts_chartist',
                                'lazy_weathericons',
                                'lazy_clndr',
                                'lazy_google_maps',
                                'app/components/dashboard/dashboardController.js'
                            ], {serie: true} );
                        }],
                        sale_chart_data: function($http){
                            return $http({method: 'GET', url: 'data/mg_dashboard_chart.min.json'})
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        user_data: function($http){
                            return $http({ method: 'GET', url: 'data/user_data.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Dashboard'
                    },
                    ncyBreadcrumb: {
                        label: 'Home'
                    }
                })
                 // -- Agent Application --
                .state("restricted.agent", {
                    url: "/agent",
                    templateUrl: 'app/components/application/CLLCAgent.html',
                    controller: 'agentCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_iCheck',
                                'app/components/application/CLLCAgent.js'
                            ]);
                        }]
                    }
                })
                .state("restricted.agentprofileview", {
                    url: "/agentprofileview",
                    templateUrl: 'app/components/application/agencyProfile.html',
                    controller: 'cllcAgencyCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_iCheck',
                                'lazy_parsleyjs',
                                'lazy_selectizeJS',
                                'app/components/application/agencyProfile.js'
                            ]);
                        }]
                    }
                })
                .state("restricted.studentprofileview", {
                    url: "/Studentprofileview",
                    templateUrl: 'app/components/application/profile_edit.html',
                    controller: 'cllcProfile',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_iCheck',
                                'lazy_parsleyjs',
                                'lazy_selectizeJS',
                                'app/components/application/profile_editCtrl.js'
                            ]);
                        }]
                    }
                })
                .state("restricted.agentknow", {
                    url: "/agentknow",
                    templateUrl: 'app/components/application/CLLCAgentKnow.html',
                    controller: 'agentKnowCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_iCheck',
                                'app/components/application/CLLCAgentKnow.js'
                            ]);
                        }]
                    }
                })
                .state("restricted.agentreferences", {
                    url: "/agentreferences",
                    templateUrl: 'app/components/application/CLLCReferences.html',
                    controller: 'agentReferencesCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_iCheck',
                                'app/components/application/CLLCReferences.js'
                            ]);
                        }]
                    }
                })
                // -- Student Application --
                .state("restricted.studentview", {
                    url: "/studentview",
                    templateUrl: 'app/components/application/studentView.html',
                    controller: 'studentviewCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_iCheck',
                                'app/components/application/studentController.js'
                            ]);
                        }]
                    }
                })
                .state("restricted.stuinformview", {
                    url: "/stuinformview",
                    templateUrl: 'app/components/application/informView.html',
                    controller: 'informCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_uikit',
                                'lazy_iCheck',
                                'app/components/application/informController.js'
                            ]);
                        }]
                    }
                })
        }
    ]);

angular
    .module('hrmsApp')
    .controller('mainCtrl', [
        function () {}
    ])
;

/* ocLazyLoad config */

hrmsApp
    .config([
        '$ocLazyLoadProvider',
        function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: false,
                modules: [
                    // ----------- UIKIT ------------------
                    {
                        name: 'lazy_uikit',
                        files: [
                            // uikit core
                            "bower_components/uikit/js/uikit.min.js",
                            // uikit components
                            "bower_components/uikit/js/components/accordion.min.js",
                            "bower_components/uikit/js/components/autocomplete.min.js",
                            "assets/js/custom/uikit_datepicker.min.js",
                            "bower_components/uikit/js/components/form-password.min.js",
                            "bower_components/uikit/js/components/form-select.min.js",
                            "bower_components/uikit/js/components/grid.min.js",
                            "bower_components/uikit/js/components/lightbox.min.js",
                            "bower_components/uikit/js/components/nestable.min.js",
                            "bower_components/uikit/js/components/notify.min.js",
                            "bower_components/uikit/js/components/slider.min.js",
                            "bower_components/uikit/js/components/slideshow.min.js",
                            "bower_components/uikit/js/components/sortable.min.js",
                            "bower_components/uikit/js/components/sticky.min.js",
                            "bower_components/uikit/js/components/tooltip.min.js",
                            "assets/js/custom/uikit_timepicker.min.js",
                            "bower_components/uikit/js/components/upload.min.js",
                            "assets/js/custom/uikit_beforeready.min.js",
                            // styles
                            "bower_components/uikit/css/uikit.almost-flat.min.css"
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },

                    // ----------- FORM ELEMENTS -----------
                    {
                        name: 'lazy_autosize',
                        files: [
                            'bower_components/autosize/dist/autosize.min.js',
                            'app/modules/angular-autosize.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_iCheck',
                        files: [
                            "bower_components/iCheck/icheck.min.js",
                            'app/modules/angular-icheck.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_selectizeJS',
                        files: [
                            'bower_components/selectize/dist/js/standalone/selectize.min.js',
                            'app/modules/angular-selectize.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_switchery',
                        files: [
                            'bower_components/switchery/dist/switchery.min.js',
                            'app/modules/angular-switchery.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_ionRangeSlider',
                        files: [
                            'bower_components/ion.rangeslider/js/ion.rangeSlider.min.js',
                            'app/modules/angular-ionRangeSlider.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_masked_inputs',
                        files: [
                             'bower_components/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js'
                        ]
                    },
                    {
                        name: 'lazy_character_counter',
                        files: [
                            'app/modules/angular-character-counter.min.js'
                        ]
                    },
                    {
                        name: 'lazy_parsleyjs',
                        files: [
                            'assets/js/custom/parsleyjs_config.min.js',
                            'bower_components/parsleyjs/dist/parsley.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_wizard',
                        files: [
                            'bower_components/angular-wizard/dist/angular-wizard.min.js'
                        ]
                    },
                    {
                        name: 'lazy_ckeditor',
                        files: [
                            'bower_components/ckeditor/ckeditor.js',
                            'app/modules/angular-ckeditor.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_tinymce',
                        files: [
                            'bower_components/tinymce/tinymce.min.js',
                            'app/modules/angular-tinymce.min.js'
                        ],
                        serie: true
                    },

                    // ----------- CHARTS -----------
                    {
                        name: 'lazy_charts_chartist',
                        files: [
                            'bower_components/chartist/dist/chartist.min.css',
                            'bower_components/chartist/dist/chartist.min.js',
                            'app/modules/angular-chartist.min.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_charts_easypiechart',
                        files: [
                            'bower_components/jquery.easy-pie-chart/dist/angular.easypiechart.min.js'
                        ]
                    },
                    {
                        name: 'lazy_charts_metricsgraphics',
                        files: [
                            'bower_components/metrics-graphics/dist/metricsgraphics.css',
                            'bower_components/d3/d3.min.js',
                            'bower_components/metrics-graphics/dist/metricsgraphics.min.js',
                            'app/modules/angular-metrics-graphics.min.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_charts_c3',
                        files: [
                            'bower_components/c3js-chart/c3.min.css',
                            'bower_components/d3/d3.min.js',
                            'bower_components/c3js-chart/c3.min.js',
                            'bower_components/c3-angular/c3-angular.min.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_charts_peity',
                        files: [
                            'bower_components/peity/jquery.peity.min.js',
                            'app/modules/angular-peity.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_echarts',
                        files: [
                            'bower_components/echarts/dist/echarts.js',
                            'assets/js/custom/echarts/maps/china.js',
                            'app/modules/angular-echarts.js'
                        ],
                        serie: true
                    },

                    // ----------- COMPONENTS -----------
                    {
                        name: 'lazy_countUp',
                        files: [
                            'bower_components/countUp.js/dist/countUp.min.js',
                            'app/modules/angular-countUp.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_clndr',
                        files: [
                            'bower_components/clndr/clndr.min.js',
                            'bower_components/angular-clndr/angular-clndr.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_google_maps',
                        files: [
                            'bower_components/ngmap/build/scripts/ng-map.min.js',
                            'bower_components/ngmap/directives/places-auto-complete.js',
                            'bower_components/ngmap/directives/marker.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_weathericons',
                        files: [
                            'bower_components/weather-icons/css/weather-icons.min.css'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_prismJS',
                        files: [
                            "bower_components/prism/prism.js",
                            "bower_components/prism/components/prism-php.js",
                            "bower_components/prism/components/prism-markup-templating.js",
                            "bower_components/prism/plugins/line-numbers/prism-line-numbers.js",
                            'app/modules/angular-prism.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_dragula',
                        files: [
                            'bower_components/angular-dragula/dist/angularjs-dragula.min.js'
                        ]
                    },
                    {
                        name: 'lazy_pagination',
                        files: [
                            'bower_components/angularUtils-pagination/dirPagination.js'
                        ]
                    },
                    {
                        name: 'lazy_diff',
                        files: [
                            'bower_components/jsdiff/diff.min.js'
                        ]
                    },

                    // ----------- PLUGINS -----------
                    {
                        name: 'lazy_fullcalendar',
                        files: [
                            'bower_components/fullcalendar/dist/fullcalendar.min.css',
                            'bower_components/fullcalendar/dist/fullcalendar.min.js',
                            'bower_components/fullcalendar/dist/gcal.js',
                            'bower_components/angular-ui-calendar/src/calendar.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_codemirror',
                        files: [
                            "bower_components/codemirror/lib/codemirror.css",
                            "assets/css/codemirror_themes.min.css",
                            "bower_components/codemirror/lib/codemirror.js",
                            "assets/js/custom/codemirror_fullscreen.min.js",
                            "bower_components/codemirror/addon/edit/matchtags.js",
                            "bower_components/codemirror/addon/edit/matchbrackets.js",
                            "bower_components/codemirror/addon/fold/xml-fold.js",
                            "bower_components/codemirror/mode/htmlmixed/htmlmixed.js",
                            "bower_components/codemirror/mode/xml/xml.js",
                            "bower_components/codemirror/mode/php/php.js",
                            "bower_components/codemirror/mode/clike/clike.js",
                            "bower_components/codemirror/mode/javascript/javascript.js",
                            "app/modules/angular-codemirror.min.js"
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_datatables',
                        files: [
                            'bower_components/datatables/media/js/jquery.dataTables.min.js',
                            'bower_components/angular-datatables/dist/angular-datatables.js',
                            'assets/js/custom/jquery.dataTables.columnFilter.js',
                            'bower_components/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.min.js',
                            'assets/js/custom/datatables/datatables.uikit.js',
                            // buttons
                            'bower_components/datatables-buttons/js/dataTables.buttons.js',
                            'bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.min.js',
                            'assets/js/custom/datatables/buttons.uikit.js',
                            'bower_components/jszip/dist/jszip.min.js',
                            'bower_components/pdfmake/build/pdfmake.min.js',
                            'bower_components/pdfmake/build/vfs_fonts.js',
                            'bower_components/datatables-buttons/js/buttons.colVis.js',
                            'bower_components/datatables-buttons/js/buttons.html5.js',
                            'bower_components/datatables-buttons/js/buttons.print.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_gantt_chart',
                        files: [
                            <!-- jquery ui -->
                            'bower_components/jquery-ui/jquery-ui.min.js',
                            <!-- gantt chart -->
                            'assets/js/custom/gantt_chart.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_tablesorter',
                        files: [
                            'bower_components/tablesorter/dist/js/jquery.tablesorter.min.js',
                            'bower_components/tablesorter/dist/js/jquery.tablesorter.widgets.min.js',
                            'bower_components/tablesorter/dist/js/widgets/widget-alignChar.min.js',
                            'bower_components/tablesorter/dist/js/widgets/widget-columnSelector.min.js',
                            'bower_components/tablesorter/dist/js/widgets/widget-print.min.js',
                            'bower_components/tablesorter/dist/js/extras/jquery.tablesorter.pager.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_vector_maps',
                        files: [
                            'bower_components/raphael/raphael.min.js',
                            'bower_components/jquery-mapael/js/jquery.mapael.js',
                            'bower_components/jquery-mapael/js/maps/world_countries.js',
                            'bower_components/jquery-mapael/js/maps/usa_states.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_dropify',
                        files: [
                            'assets/skins/dropify/css/dropify.css',
                            'bower_components/dropify/dist/js/dropify.min.js'
                        ],
                        insertBefore: '#main_stylesheet'
                    },
                    {
                        name: 'lazy_dropzone',
                        files: [
                            'bower_components/dropzone/dist/dropzone.js'
                        ],
                        insertBefore: '#main_stylesheet'
                    },
                    {
                        name: 'lazy_tree',
                        files: [
                            'assets/skins/jquery.fancytree/ui.fancytree.min.css',
                            <!-- jquery ui -->
                            'bower_components/jquery-ui/jquery-ui.min.js',
                            <!-- fancytree -->
                            'bower_components/jquery.fancytree/dist/jquery.fancytree-all.min.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_idle_timeout',
                        files: [
                            'bower_components/ng-idle/angular-idle.min.js'
                        ]
                    },
                    {
                        name: 'lazy_tour',
                        files: [
                            'bower_components/enjoyhint/enjoyhint.min.js'
                        ]
                    },
                    {
                        name: 'lazy_filemanager',
                        files: [
                            'bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css',
                            'file_manager/css/elfinder.min.css',
                            'file_manager/themes/material/css/theme.css',
                            'bower_components/jquery-ui/jquery-ui.min.js',
                            'file_manager/js/elfinder.min.js'
                        ],
			            insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_image_cropper',
                        files: [
                            'bower_components/cropper/dist/cropper.min.css',
                            'bower_components/cropper/dist/cropper.min.js'
                        ]
                    },
                    {
                        name: 'lazy_context_menu',
                        files: [
                        'bower_components/jQuery-contextMenu/dist/jquery.ui.position.min.js',
                        'bower_components/jQuery-contextMenu/dist/jquery.contextMenu.min.css',
                        'bower_components/jQuery-contextMenu/dist/jquery.contextMenu.min.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_quiz',
                        files: [
                            'assets/js/custom/slickQuiz/slickQuiz.js'
                        ]
                    },
                    {
                        name: 'lazy_listNav',
                        files: [
                            'bower_components/jquery-listnav/jquery-listnav.min.js'
                        ]
                    },
                    {
                        name: 'lazy_uiSelect',
                        files: [
                            'bower_components/angular-ui-select/dist/select.min.css',
                            'bower_components/angular-ui-select/dist/select.min.js'
                        ]
                    },

                    // ----------- KENDOUI COMPONENTS -----------
                    {
                        name: 'lazy_KendoUI',
                        files: [
                            'bower_components/kendo-ui/js/kendo.core.min.js',
                            'bower_components/kendo-ui/js/kendo.color.min.js',
                            'bower_components/kendo-ui/js/kendo.data.min.js',
                            'bower_components/kendo-ui/js/kendo.calendar.min.js',
                            'bower_components/kendo-ui/js/kendo.popup.min.js',
                            'bower_components/kendo-ui/js/kendo.datepicker.min.js',
                            'bower_components/kendo-ui/js/kendo.timepicker.min.js',
                            'bower_components/kendo-ui/js/kendo.datetimepicker.min.js',
                            'bower_components/kendo-ui/js/kendo.list.min.js',
                            'bower_components/kendo-ui/js/kendo.fx.min.js',
                            'bower_components/kendo-ui/js/kendo.userevents.min.js',
                            'bower_components/kendo-ui/js/kendo.menu.min.js',
                            'bower_components/kendo-ui/js/kendo.draganddrop.min.js',
                            'bower_components/kendo-ui/js/kendo.slider.min.js',
                            'bower_components/kendo-ui/js/kendo.mobile.scroller.min.js',
                            'bower_components/kendo-ui/js/kendo.autocomplete.min.js',
                            'bower_components/kendo-ui/js/kendo.combobox.min.js',
                            'bower_components/kendo-ui/js/kendo.dropdownlist.min.js',
                            'bower_components/kendo-ui/js/kendo.colorpicker.min.js',
                            'bower_components/kendo-ui/js/kendo.combobox.min.js',
                            'bower_components/kendo-ui/js/kendo.maskedtextbox.min.js',
                            'bower_components/kendo-ui/js/kendo.multiselect.min.js',
                            'bower_components/kendo-ui/js/kendo.numerictextbox.min.js',
                            'bower_components/kendo-ui/js/kendo.toolbar.min.js',
                            'bower_components/kendo-ui/js/kendo.panelbar.min.js',
                            'bower_components/kendo-ui/js/kendo.window.min.js',
                            'bower_components/kendo-ui/js/kendo.angular.min.js',
                            'bower_components/kendo-ui/styles/kendo.common-material.min.css',
                            'bower_components/kendo-ui/styles/kendo.material.min.css'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },

                    // ----------- UIKIT HTMLEDITOR -----------
                    {
                        name: 'lazy_htmleditor',
                        files: [
                            "bower_components/codemirror/lib/codemirror.js",
                            "bower_components/codemirror/mode/markdown/markdown.js",
                            "bower_components/codemirror/addon/mode/overlay.js",
                            "bower_components/codemirror/mode/javascript/javascript.js",
                            "bower_components/codemirror/mode/php/php.js",
                            "bower_components/codemirror/mode/gfm/gfm.js",
                            "bower_components/codemirror/mode/xml/xml.js",
                            "bower_components/marked/lib/marked.js",
                            "bower_components/uikit/js/components/htmleditor.js"
                        ],
                        serie: true
                    },

                    // ----------- THEMES -------------------
                    {
                        name: 'lazy_themes',
                        files: [
                            "assets/css/themes/_theme_a.min.css",
                            "assets/css/themes/_theme_b.min.css",
                            "assets/css/themes/_theme_c.min.css",
                            "assets/css/themes/_theme_d.min.css",
                            "assets/css/themes/_theme_e.min.css",
                            "assets/css/themes/_theme_f.min.css",
                            "assets/css/themes/_theme_g.min.css",
                            "assets/css/themes/_theme_h.min.css",
                            "assets/css/themes/_theme_i.min.css",
                            "assets/css/themes/_theme_dark.min.css"
                        ]
                    }

                ]
            })
        }
    ]);