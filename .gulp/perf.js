module.exports = function (gulp, paths) {
    var critical = require('critical'),
        fs = require('fs');

    gulp.task('perf:critical', function () {
        critical.generate({
            base: './',
            src: 'public/index.html',
            css: [paths.prod.dest.styles + '/style.css'],
            width: 320,
            height: 480,
            minify: true
        }, function (err, output) {
            fs.writeFile(
                'themes/sysoev.org/layout/_partial/critical-css/main.ejs', '<style>' + output + '</style>'
            );
        });

        critical.generate({
            base: './',
            src: 'public/dega-event-delegation/index.html',
            css: [paths.prod.dest.styles + '/style.css'],
            width: 320,
            height: 480,
            minify: true
        }, function (err, output) {
            fs.writeFile(
                'themes/sysoev.org/layout/_partial/critical-css/post.ejs', '<style>' + output + '</style>'
            );
        });

        critical.generate({
            base: './',
            src: 'public/tags/javascript/index.html',
            css: [paths.prod.dest.styles + '/style.css'],
            width: 320,
            height: 480,
            minify: true
        }, function (err, output) {
            fs.writeFile(
                'themes/sysoev.org/layout/_partial/critical-css/tag.ejs', '<style>' + output + '</style>'
            );
        });
    });
};
