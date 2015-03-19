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
          'src/slot.machine.js'
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
          'dist/slot.machine.css': 'src/slot.machine.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'dist/slot.machine.min.css': 'src/slot.machine.scss'
        }
      }
    },
    copy: {
      main: {
        src: 'src/slot.machine.js',
        dest: 'dist/slot.machine.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'dist/slot.machine.min.js': 'src/slot.machine.js'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'jshint:all',
    'sass',
    'copy',
    'uglify'
  ]);
};