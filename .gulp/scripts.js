module.exports = function(gulp, paths) {
    var $ = require('gulp-load-plugins')();

    gulp.task('js:dev', function() {
        // Single entry point to browserify
        gulp.src(paths.js)
            .pipe($.browserify({
                insertGlobals: false,
                debug: true
            }))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest(paths.styleguide.dest.js));
    });

    gulp.task('js:prod', function() {
        gulp.src(paths.js)
            .pipe($.browserify({
                insertGlobals: false,
                debug: false
            }))
            .pipe($.uglify())
            .on('error', console.error.bind(console))
            .pipe(gulp.dest(paths.prod.dest.js));
    });
};
