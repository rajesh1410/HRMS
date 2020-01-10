hrmsApp
    .service('detectBrowser', [
        '$window',
        function ($window) {
            // http://stackoverflow.com/questions/22947535/how-to-detect-browser-using-angular
            return function () {
                var userAgent = $window.navigator.userAgent,
                    browsers = {
                        chrome: /chrome/i,
                        safari: /safari/i,
                        firefox: /firefox/i,
                        ie: /internet explorer/i
                    };

                for (var key in browsers) {
                    if (browsers[key].test(userAgent)) {
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
        function ($rootScope, $timeout, utils) {
            $rootScope.content_preloader_show = function (style, variant, container, width, height) {
                var $body = $('body');
                if (!$body.find('.content-preloader').length) {
                    var image_density = utils.isHighDensity() ? '@2x' : '',
                        width = width ? width : 48,
                        height = height ? height : 48;

                    var preloader_content = (style == 'regular') ?
                        '<img src="assets/img/spinners/spinner' + image_density + '.gif" alt="" width="32" height="32">' :
                        '<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="' + height + '" width="' + width + '" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';

                    var thisContainer = (typeof container !== 'undefined') ? $(container) : $body;

                    thisContainer.append('<div class="content-preloader content-preloader-' + variant + '" style="height:' + height + 'px;width:' + width + 'px;margin-left:-' + width / 2 + 'px">' + preloader_content + '</div>');
                    $timeout(function () {
                        $('.content-preloader').addClass('preloader-active');
                    });
                }
            };
            $rootScope.content_preloader_hide = function () {
                var $body = $('body');
                if ($body.find('.content-preloader').length) {
                    // hide preloader
                    $('.content-preloader').removeClass('preloader-active');
                    // remove preloader
                    $timeout(function () {
                        $('.content-preloader').remove();
                    }, 500);
                }
            };

        }
    ])
    // custom services
    .service('$toast', function () {
        return function ($message, $status) {
            $message = ($message == undefined || $message == '' || $message == null) ? 'No Message' : $message;
            $status = ($status == undefined || $status == '' || $status == null) ? 'primary' : $status;
            UIkit.notify({
                message: $message,
                status: $status,
                timeout: 3000,
                pos: "top-center"
            });
        }
    })

    .service('$checkPrevRow', function () {
        return function ($ArrayData) {
            var ArrayLength = $ArrayData.length;
            var LastRowIndex = ArrayLength == 0 ? 0 : $ArrayData.length - 1;
            var LastRowData = $ArrayData[LastRowIndex];

            var LastRowValues = Object.keys(LastRowData).map(function (keys) {
                return LastRowData[keys];
            });
            console.log(LastRowValues, 'sd');
            var Invalidcount = 0;

            LastRowValues.forEach(function (values) {
                if (values === "") {
                    Invalidcount += 1
                }
            })

            var IsValid = Invalidcount == 0 ? false : true;
            if (IsValid) {
                UIkit.modal.alert("Please fill current row ");
                return false;
            }
            return true;
        }
    })

    .service('$Sessionmanager', [
        '$http',
        '$rootScope',
        function ($http, $rootScope) {

            this.setStorage = function (key, value) {
                var value = Object.prototype.toString.apply(value) == "[object Object]" ? JSON.stringify(value) : value;
                //console.log(typeof value,"value");
                localStorage.setItem(key, value);
                var expire_on = moment().add('30', 'minutes').format("LLLL");
                console.log(expire_on, "--expire_on--");
                localStorage.setItem('sessionExpire', expire_on);
            }
            this.getStorage = function (key) {
                var data = localStorage.getItem(key);
                return data;
            }
            this.payroll = function () {
                // var data = JSON.parse(localStorage.getItem('UserData'));
                // console.log(data, "---data---");
                // var token = data.token;
                $http({
                    method: 'Get',
                    url: $rootScope.$siteUrl + 'users',
                })
            }

        }
    ])


// .service('$Privilage', function () {
//     this.checkPrivilage = function (data) {

//     }
// })