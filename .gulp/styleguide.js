module.exports = function (gulp, paths, autoprefixerConf) {
    var $ = require('gulp-load-plugins')(),
        styleguide = require('sc5-styleguide');

    gulp.task('styleguide:img', function () {
        return gulp.src(paths.styleguide.publicImg)
            .on('error', console.trace.bind(console))
            .pipe(gulp.dest(paths.styleguide.dest.img));
    });

    gulp.task('styleguide:generate', function () {
        return gulp.src(paths.styles)
            .pipe(styleguide.generate({
                title: 'sysoev.org — Style Guide',
                server: true,
                rootPath: paths.styleguide.dest.main,
                overviewPath: '_layout-src/README.md',
                styleVariables: paths.styleguide.styleVars
            }))
            .on('error', console.trace.bind(console))
            .pipe(gulp.dest(paths.styleguide.dest.main));
    });

    gulp.task('styleguide:applystyles', function () {
        return gulp.src(paths.styleguide.style)
            .pipe($.sass({
                errLogToConsole: true,
                sourceComments: 'map'
            }))
            .pipe($.autoprefixer(autoprefixerConf))
            .pipe(styleguide.applyStyles())
            .on('error', console.error.bind(console))
            .pipe(gulp.dest(paths.styleguide.dest.main));
    });

    gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
};
