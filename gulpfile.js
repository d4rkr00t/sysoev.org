var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),

    minifyCSS = require('gulp-minify-css'),
    htmlmin = require('gulp-html-minifier'),

    critical = require('critical'),
    fs = require('fs'),

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

gulp.task('style:prod', function() {
    return gulp.src(paths.mainStyle)
        .pipe($.sass({
            errLogToConsole: true,
        }))
        .on('error', console.error.bind(console))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.uncss(UNCSS_CONFIG))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.prod.dest.styles));
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

gulp.task('font:prod', function() {
    return gulp.src(paths.font)
        .pipe($.copy(paths.prod.dest.font, {
            prefix: paths.font.split('/').reduce(function(prev) {
                return prev + 1;
            }, 0)
        }));
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

gulp.task('svg:prod', function() {
    return gulp.src(paths.svg)
        .pipe($.copy(paths.prod.dest.svg, {
            prefix: paths.svg.split('/').reduce(function(prev) {
                return prev + 1;
            }, 0) - 2
        }));
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

gulp.task('html:out:post', function() {
    gulp.src(paths.prod.html[0])
        .pipe(htmlmin(HTML_MINIFY_OPTS))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest(paths.prod.dest.html[0]));
});

gulp.task('html:posts:post', function() {
    gulp.src(paths.prod.html[1])
        .pipe(htmlmin(HTML_MINIFY_OPTS))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest(paths.prod.dest.html[1]));
});

gulp.task('html:tags:post', function() {
    gulp.src(paths.prod.html[2])
        .pipe(htmlmin(HTML_MINIFY_OPTS))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest(paths.prod.dest.html[2]));
});

/**
 * Performance
 */
gulp.task('critical:perf', function(cb) {
    critical.generate({
        base: './',
        src: 'styleguide/pages/index.html',
        css: ['docpad/src/files/css/style.css'],
        width: 320,
        height: 480,
        minify: true
    }, function(err, output){
        fs.writeFile('docpad/src/partials/critical_css/main.html', '<style>' + output + '</style>');
    });

    critical.generate({
        base: './',
        src: 'styleguide/pages/post.html',
        css: ['docpad/src/files/css/style.css'],
        width: 320,
        height: 480,
        minify: true
    }, function(err, output){
        fs.writeFile('docpad/src/partials/critical_css/post.html', '<style>' + output + '</style>');
    });

    critical.generate({
        base: './',
        src: 'styleguide/pages/tag.html',
        css: ['docpad/src/files/css/style.css'],
        width: 320,
        height: 480,
        minify: true
    }, function(err, output){
        fs.writeFile('docpad/src/partials/critical_css/tag.html', '<style>' + output + '</style>');
    });
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
