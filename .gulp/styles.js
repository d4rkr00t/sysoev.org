module.exports = function(gulp, paths, reload, autoprefixerConf, uncssConf) {
    var $ = require('gulp-load-plugins')(),
        minifyCSS = require('gulp-minify-css');

    gulp.task('style:dev', function() {
        return gulp.src(paths.mainStyle)
            .pipe($.sass({
                errLogToConsole: true,
                sourceComments: 'map'
            }))
            .on('error', console.error.bind(console))
            .pipe($.autoprefixer(autoprefixerConf))
            .pipe(gulp.dest(paths.styleguide.dest.styles))
            .pipe(reload({ stream: true }));
    });

    gulp.task('style:out', function() {
        return gulp.src(paths.mainStyle)
            .pipe($.sass({
                errLogToConsole: true,
                sourceComments: 'map'
            }))
            .on('error', console.error.bind(console))
            .pipe($.autoprefixer(autoprefixerConf))
            .pipe(gulp.dest(paths.out.dest.styles))
            .pipe(reload({ stream: true }));
    });

    gulp.task('style:prod', function() {
        return gulp.src(paths.mainStyle)
            .pipe($.sass({
                errLogToConsole: true,
            }))
            .on('error', console.error.bind(console))
            .pipe($.autoprefixer(autoprefixerConf))
            .pipe($.uncss(uncssConf))
            .pipe(minifyCSS())
            .pipe(gulp.dest(paths.prod.dest.styles));
    });
};
