var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),

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

    HTML_MINIFY_OPTS = {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true
    },

    UNCSS_CONFIG = {
        html: [
            './styleguide/pages/index.html',
            './styleguide/pages/post.html',
            './styleguide/pages/tag.html',
            './styleguide/pages/tag-small.html'
        ],
        ignore: [
            /\.pswp.+/,
            '.diff',
            '.method',
            '.css',
            '.highlight',
            '.search',
            '.search.-active',
            'p.-notice'
        ]
    },

    paths = {
        mainStyle: '_src/layout/css/style.scss',
        styles: ['_src/layout/components/*.scss', '_src/layout/components/**/*.scss'],
        partials: '_src/layout/components/**/*.html',
        font: '_src/layout/components/_icon/font/*',
        svg: '_src/layout/components/**/*.svg',
        js: '_src/layout/js/*.js',
        compJs: '_src/layout/components/**/*.js',
        styleguide: {
            pages: '_src/styleguide/pages/*.html',
            styleguide: '_src/styleguide/index.html',
            style: '_src/styleguide/styleguide.scss',
            dest: {
                main: 'styleguide',
                pages: 'styleguide/pages',
                styles: 'styleguide/css',
                font: 'styleguide/font',
                svg: 'styleguide/svg',
                js: 'styleguide/js',
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

/**
 * Browser Sync
 */
gulp.task('serve', function() {
    browserSync({
        notify: false,
        server: 'styleguide'
    });
});

require('./.gulp/styles.js')(gulp, paths, reload, AUTOPREFIXER_BROWSERS, UNCSS_CONFIG);
require('./.gulp/styleguide.js')(gulp, paths, AUTOPREFIXER_BROWSERS, reload);
require('./.gulp/font.js')(gulp, paths, reload);
require('./.gulp/svg.js')(gulp, paths, reload);
require('./.gulp/scripts.js')(gulp, paths, reload);
require('./.gulp/html.js')(gulp, paths, HTML_MINIFY_OPTS);
require('./.gulp/perf.js')(gulp, paths);

/**
 * Watchers
 */
gulp.task('watch', function() {
    gulp.watch(paths.styles, ['style:dev', 'style:out']);
    gulp.watch(paths.styleguide.style, ['styleguide:styles']);
    gulp.watch(paths.styleguide.styleguide, ['styleguide:main']);
    gulp.watch(paths.styleguide.pages, ['styleguide:pages']);
    gulp.watch(paths.partials, ['styleguide:pages']);
    gulp.watch([paths.js, paths.compJs], ['js:dev']);
});

/**
 * Tasks
 */

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

gulp.task('prod', [
    'style:prod',
    'font:prod',
    'svg:prod',
    'js:prod',
]);

gulp.task('post', [
    'post:html'
]);
