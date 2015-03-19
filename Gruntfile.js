'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'slot.machine.js'
        ]
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {
          'slot.machine.css': 'slot.machine.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'slot.machine.min.css': 'slot.machine.scss'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'slot.machine.min.js': 'slot.machine.js'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'jshint:all',
    'sass',
    'uglify'
  ]);
};