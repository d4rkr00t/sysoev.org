'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dev: {
                options: {
                    sassDir: 'css',
                    cssDir: 'css',
                    outputStyle: 'compressed'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['karma.conf.js']
            },
            all: ['*.js']
        },
        watch: {
            scripts: {
                files: ['{,*/}{,*/}{,*/}*.js'],
                tasks: ['jshint:all'],
                options: {
                    interrupt: true
                }
            },
            css: {
                files: ['blocks/{,*/}*.scss', 'css/*.scss'],
                tasks: ['compass'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    // on watch events configure jshint:all to only run on changed file
    grunt.event.on('watch', function(action, filepath) {
        grunt.config(['jshint', 'all'], filepath);
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
    // Build task.
    // grunt.registerTask('build', ['compass', 'cssmin', 'jshint']);
};
