module.exports = function(gulp, paths, autoprefixerConf) {
    var $ = require('gulp-load-plugins')(),
        minifyCSS = require('gulp-minify-css');

    gulp.task('style:out', function() {
        return gulp.src(paths.mainStyle)
            .pipe($.sass({
                errLogToConsole: true,
                sourceComments: 'map'
            }))
            .on('error', console.error.bind(console))
            .pipe($.autoprefixer(autoprefixerConf))
            .pipe(gulp.dest(paths.prod.dest.styles))
            .pipe(reload({ stream: true }));
    });

    gulp.task('style:prod', function() {
        return gulp.src(paths.mainStyle)
            .pipe($.sass({
                errLogToConsole: true,
            }))
            .on('error', console.error.bind(console))
            .pipe($.autoprefixer(autoprefixerConf))
            .pipe(minifyCSS())
            .pipe(gulp.dest(paths.prod.dest.styles));
    });
};
