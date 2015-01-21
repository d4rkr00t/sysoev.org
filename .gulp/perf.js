module.exports = function(gulp, paths) {
    var $ = require('gulp-load-plugins')(),
        critical = require('critical'),
        fs = require('fs');

    gulp.task('perf:critical', function(cb) {
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
};
