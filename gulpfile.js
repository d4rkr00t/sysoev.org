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
        mainStyle: 'src/layout/css/style.scss',
        styles: ['src/layout/components/*.scss', 'src/layout/components/**/*.scss'],
        partials: 'src/layout/components/**/*.html',
        font: 'src/layout/components/_icon/font/*',
        svg: 'src/layout/components/**/*.svg',
        js: 'src/layout/js/*.js',
        compJs: 'src/layout/components/**/*.js',
        styleguide: {
            pages: 'src/styleguide/pages/*.html',
            styleguide: 'src/styleguide/index.html',
            style: 'src/styleguide/styleguide.scss',
            dest: {
                main: 'styleguide',
                pages: 'styleguide/pages',
                styles: 'styleguide/css',
                font: 'styleguide/font',
                svg: 'styleguide/svg',
                js: 'styleguide/js',
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
 * Style
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
 * FONT Dev
 */
gulp.task('font:dev', function() {
    return gulp.src(paths.font)
        .pipe($.copy(paths.styleguide.dest.font, {
            prefix: paths.font.split('/').reduce(function(prev) {
                return prev + 1;
            }, 0)
        }))
        .pipe(reload({ stream: true }));
});

/**
 * SVG
 */
gulp.task('svg:dev', function() {
    return gulp.src(paths.svg)
        .pipe($.copy(paths.styleguide.dest.svg, {
            prefix: paths.svg.split('/').reduce(function(prev) {
                return prev + 1;
            }, 0) - 2
        }))
        .pipe(reload({ stream: true }));
});

/**
 * Scripts
 */
gulp.task('js:dev', function() {
    // Single entry point to browserify
    gulp.src(paths.js)
        .pipe($.browserify({
            insertGlobals: false,
            debug: true
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest(paths.styleguide.dest.js))
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
    gulp.watch([paths.js, paths.compJs], ['js:dev']);
});

gulp.task('dev', [
    'style:dev',
    'styleguide:styles',
    'styleguide:main',
    'styleguide:pages',
    'font:dev',
    'svg:dev',
    'watch',
    'serve'
]);
