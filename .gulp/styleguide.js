module.exports = function (gulp, paths, autoprefixerConf) {
    var $ = require('gulp-load-plugins')(),
        styleguide = require('sc5-styleguide');

    function generateStyleguideGenerate(server) {
        return gulp.src(paths.styles)
            .pipe(styleguide.generate({
                title: 'sysoev.org — Style Guide',
                server: server,
                rootPath: paths.styleguide.dest.main,
                overviewPath: '_layout-src/README.md',
                styleVariables: paths.styleguide.styleVars,
                appRoot: server ? undefined : '/styleguide/'
            }))
            .on('error', console.trace.bind(console))
            .pipe(gulp.dest(paths.styleguide.dest.main));
    }

    gulp.task('styleguide:img', function () {
        return gulp.src(paths.styleguide.publicImg)
            .on('error', console.trace.bind(console))
            .pipe(gulp.dest(paths.styleguide.dest.img));
    });

    gulp.task('styleguide:generate', function () {
        return generateStyleguideGenerate(true);
    });

    gulp.task('styleguide:generate:prod', function () {
        return generateStyleguideGenerate(false);
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

    gulp.task('styleguide:dev', ['styleguide:img', 'styleguide:generate', 'styleguide:applystyles']);
    gulp.task('styleguide:prod', ['styleguide:img', 'styleguide:generate:prod', 'styleguide:applystyles']);
};
