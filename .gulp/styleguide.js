module.exports = function(gulp, paths, autoprefixerConf, reload) {
    var $ = require('gulp-load-plugins')();

    /**
     * Style Guide Styles
     */
    gulp.task('styleguide:styles', function() {
        return gulp.src(paths.styleguide.style)
            .pipe($.sass({
                errLogToConsole: true,
                sourceComments: 'map'
            }))
            .on('error', console.error.bind(console))
            .pipe($.autoprefixer(autoprefixerConf))
            .pipe(gulp.dest(paths.styleguide.dest.styles))
            .pipe(reload({ stream: true }));
    });

    /**
     * Style Guide Main
     */
    gulp.task('styleguide:main', function() {
        return gulp.src(paths.styleguide.styleguide)
            .pipe($.swig({
                defaults: {
                    cache: false
                }
            }))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest(paths.styleguide.dest.main))
            .pipe(reload({ stream: true }));
    });

    /**
     * Style Guide Pages
     */
    gulp.task('styleguide:pages', function() {
        return gulp.src(paths.styleguide.pages)
            .pipe($.swig({
                defaults: {
                    cache: false
                }
            }))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest(paths.styleguide.dest.pages))
            .pipe(reload({ stream: true }));
    });
};
