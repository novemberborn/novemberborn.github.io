'use strict';

var shell = require('grunt-release/node_modules/shelljs');

module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      combine: {
        options: {
          keepSpecialComments: 1,
          keepBreaks: true,
          processImport: true
        },
        files: {
          '-/style.min.css': ['-/style.css']
        }
      }
    },

    release: {
      options: {
        npm: false,
        tagName: 'v<%= version %>',
        commitMessage: '<%= version %>',
        tagMessage: '<%= version %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-release');

  grunt.renameTask('release', 'tagrelease');

  grunt.registerTask('commitminfile', function() {
    grunt.verbose.writeln('Add style.min.css');
    shell.exec('git add ./-/style.min.css', { silent: true });
    shell.exec('git commit ./-/style.min.css -m "Recompile minified CSS"', { silent: true });
  });

  grunt.registerTask('release', function(type) {
    grunt.task.run('cssmin');
    grunt.task.run('commitminfile');
    grunt.task.run('tagrelease:' + type);
  });
};
