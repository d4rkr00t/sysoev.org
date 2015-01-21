module.exports = function(gulp, paths, reload) {
    var $ = require('gulp-load-plugins')();

    gulp.task('font:dev', function() {
        return gulp.src(paths.font)
            .pipe($.copy(paths.styleguide.dest.font, {
                prefix: paths.font.split('/').reduce(function(prev) {
                    return prev + 1;
                }, 0)
            }))
            .pipe(reload({ stream: true }));
    });

    gulp.task('font:prod', function() {
        return gulp.src(paths.font)
            .pipe($.copy(paths.prod.dest.font, {
                prefix: paths.font.split('/').reduce(function(prev) {
                    return prev + 1;
                }, 0)
            }));
    });
};
