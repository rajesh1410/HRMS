// -------------------- BROWSER SYNC http://www.browsersync.io/docs/ --------------------
'use strict';

var gulp = require('gulp'),
    // browser sync
    bs_angular = require('browser-sync').create('bs_angular');


gulp.task('serve', (process.argv[3] === '--compile') ? ['default'] : null, function() {

    bs_angular.init({
        // http://www.browsersync.io/docs/options/#option-host
        //host: "192.168.1.188",
        // http://www.browsersync.io/docs/options/#option-proxy
        //proxy: "cllc_app.local",
        server: {
            //https: true,
            baseDir: "./"
        },
        // http://www.browsersync.io/docs/options/#option-port
        port: 3022,
        // http://www.browsersync.io/docs/options/#option-notify
        notify: true,
        open: false,
        ui: {
            port: 3021
        }
    });

    gulp.watch('app/*.js', ['js_app']);
    gulp
        .watch('assets/js/cllc_app.min.js')
        .on('change', bs_angular.reload);

    gulp.watch('assets/less/**/*.less', ['less_main']);
    gulp
        .watch('assets/css/main.min.css')
        .on('change', function() {
            bs_angular.reload("assets/css/main.min.css")
        });

    gulp
        .watch([
            'index.html',
            'app/**/*',
            '!app/**/*.min.js'
        ])
        .on('change', bs_angular.reload);

});