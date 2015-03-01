module.exports = function(gulp, paths, htmlMinifyOpts) {
    var $ = require('gulp-load-plugins')(),
        htmlmin = require('gulp-html-minifier');

    gulp.task('post:html', function() {
        gulp.src(paths.prod.html)
            .pipe(htmlmin(htmlMinifyOpts))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest(paths.prod.dest.html));
    });
};
