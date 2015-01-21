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
            /\.hljs.+/,
            /\.pswp.+/,
            '.diff',
            '.method',
            '.css',
            '.highlight',
            '.search',
            '.search.-active'
        ]
    },

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
        },
        out: {
            dest: {
                styles: 'docpad/out/css'
            }
        },
        prod: {
            dest: {
                styles: 'docpad/src/files/css',
                font: 'docpad/src/files/font',
                svg: 'docpad/src/files/svg',
                js: 'docpad/src/files/js',
                html: ['docpad/out', 'docpad/out/posts', 'docpad/out/tags']
            },
            html: ['docpad/out/*.html', 'docpad/out/posts/*.html', 'docpad/out/tags/*.html']
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
    'html:out:post',
    'html:posts:post',
    'html:tags:post'
]);
