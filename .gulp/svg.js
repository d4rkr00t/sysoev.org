module.exports = function(gulp, paths, reload) {
    var $ = require('gulp-load-plugins')();

    gulp.task('svg:dev', function() {
        return gulp.src(paths.svg)
            .pipe($.copy(paths.styleguide.dest.svg, {
                prefix: paths.svg.split('/').reduce(function(prev) {
                    return prev + 1;
                }, 0) - 2
            }))
            .pipe(reload({ stream: true }));
    });

    gulp.task('svg:prod', function() {
        return gulp.src(paths.svg)
            .pipe($.copy(paths.prod.dest.svg, {
                prefix: paths.svg.split('/').reduce(function(prev) {
                    return prev + 1;
                }, 0) - 2
            }));
    });
};
