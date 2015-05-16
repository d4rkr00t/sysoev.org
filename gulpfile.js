var gulp = require('gulp'),

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

    HTML_MINIFY_OPTS = {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true
    },

    paths = {
        mainStyle: '_layout-src/css/style.scss',
        styles: ['_layout-src/components/*.scss', '_layout-src/components/**/*.scss'],
        font: '_layout-src/components/_icon/font/*',
        svg: '_layout-src/components/**/*.svg',
        js: '_layout-src/js/*.js',
        compJs: '_layout-src/components/**/*.js',
        styleguide: {
            publicImg: 'public/img/**/*.*',
            styleVars: '_layout-src/components/_var.scss',
            style: '_layout-src/css/style_styleguide.scss',
            dest: {
                main: 'styleguide',
                font: 'styleguide/font',
                img: 'styleguide/img',
                svg: 'styleguide/svg',
                js: 'styleguide/js'
            }
        },
        prod: {
            dest: {
                styles: 'themes/sysoev.org/source/css',
                font: 'themes/sysoev.org/source/font',
                svg: 'themes/sysoev.org/source/svg',
                js: 'themes/sysoev.org/source/js',
                html: 'public'
            },
            html: ['public/*.html', 'public/**/*.html', 'public/**/**/*.html']
        }
    };

require('./.gulp/styles.js')(gulp, paths, AUTOPREFIXER_BROWSERS);
require('./.gulp/styleguide.js')(gulp, paths, AUTOPREFIXER_BROWSERS);
require('./.gulp/font.js')(gulp, paths);
require('./.gulp/svg.js')(gulp, paths);
require('./.gulp/scripts.js')(gulp, paths);
require('./.gulp/html.js')(gulp, paths, HTML_MINIFY_OPTS);
require('./.gulp/perf.js')(gulp, paths);

/**
 * Watchers
 */
gulp.task('watch', function () {
    gulp.watch(paths.styles, ['style:out', 'styleguide:dev']);
    gulp.watch([paths.js, paths.compJs], ['js:dev']);
});

/**
 * Tasks
 */
gulp.task('dev', [
    'js:dev',
    'styleguide:dev',
    'font:dev',
    'svg:dev',
    'watch'
]);

gulp.task('prod', [
    'style:prod',
    'font:prod',
    'svg:prod',
    'js:prod'
]);

gulp.task('post', [
    'post:html'
]);
