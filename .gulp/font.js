module.exports = function (gulp, paths) {
    var $ = require('gulp-load-plugins')();

    gulp.task('font:dev', function () {
        return gulp.src(paths.font)
            .pipe($.copy(paths.styleguide.dest.font, {
                prefix: paths.font.split('/').reduce(function (prev) {
                    return prev + 1;
                }, 0)
            }));
    });

    gulp.task('font:prod', function () {
        return gulp.src(paths.font)
            .pipe($.copy(paths.prod.dest.font, {
                prefix: paths.font.split('/').reduce(function (prev) {
                    return prev + 1;
                }, 0)
            }));
    });
};
