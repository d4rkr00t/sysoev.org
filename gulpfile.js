var gulp = require('gulp'),
    $ = require('gulp-load-plugins')()

    browserSync = require('browser-sync'),
    reload = browserSync.reload,

    AUTOPREFIXER_BROWSERS = [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ],

    paths = {
        mainStyle: 'layout/css/style.scss',
        styles: ['layout/components/*.scss', 'layout/components/**/*.scss'],
        partials: 'layout/components/**/*.html',
        font: 'layout/components/_icon/font/*',
        styleguide: {
            pages: 'styleguide/src/pages/*.html',
            styleguide: 'styleguide/src/index.html',
            style: 'styleguide/css/styleguide.scss',
            dest: {
                main: 'styleguide',
                pages: 'styleguide/pages',
                styles: 'styleguide/css'
            }
        }
    };

/**
 * Browser Sync
 */
gulp.task('serve', function() {
    browserSync({
        notify: false,
        server: 'styleguide'
    });
});

/**
 * Dev Styles
 */
gulp.task('style:dev', function() {
    return gulp.src(paths.mainStyle)
        .pipe($.sass({
            errLogToConsole: true,
            sourceComments: 'map'
        }))
        .on('error', console.error.bind(console))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest(paths.styleguide.dest.styles))
        .pipe(reload({ stream: true }));
});

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
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
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

/**
 * SVG Dev
 */
gulp.task('font:dev', function() {
    return gulp.src(paths.font)
        .pipe($.copy(paths.styleguide.dest.main))
        .pipe(reload({ stream: true }));
});

/**
 * Watchers
 */
gulp.task('watch', function() {
    gulp.watch(paths.styles, ['style:dev']);
    gulp.watch(paths.styleguide.style, ['styleguide:styles']);
    gulp.watch(paths.styleguide.styleguide, ['styleguide:main']);
    gulp.watch(paths.styleguide.pages, ['styleguide:pages']);
    gulp.watch(paths.partials, ['styleguide:pages']);
});

gulp.task('dev', [
    'style:dev',
    'styleguide:styles',
    'styleguide:main',
    'styleguide:pages',
    'font:dev',
    'watch',
    'serve'
]);
