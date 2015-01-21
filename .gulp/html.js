module.exports = function(gulp, paths, htmlMinifyOpts) {
    var $ = require('gulp-load-plugins')(),
        htmlmin = require('gulp-html-minifier');

    gulp.task('html:out:post', function() {
        gulp.src(paths.prod.html[0])
            .pipe(htmlmin(htmlMinifyOpts))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest(paths.prod.dest.html[0]));
    });

    gulp.task('html:posts:post', function() {
        gulp.src(paths.prod.html[1])
            .pipe(htmlmin(htmlMinifyOpts))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest(paths.prod.dest.html[1]));
    });

    gulp.task('html:tags:post', function() {
        gulp.src(paths.prod.html[2])
            .pipe(htmlmin(htmlMinifyOpts))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest(paths.prod.dest.html[2]));
    });
};
