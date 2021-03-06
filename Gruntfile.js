'use strict';

var request = require('request');


module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35731, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort,

      },
      js: {
        files: [
          './*.js'
        ],
        tasks: ['copy']
      }
    },
    copy: {
      server: {
        files:[
          {
            src:'./*.js',
            dest: '../igm-server/node_modules/igm-utils/'            
          }
        ]
      },
      core: {
        files:[
          {
            src:'./*.js',
            dest: '../igm-core/node_modules/igm-utils/'            
          }
        ]
      }
    },
    

  });


  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'develop',
  ]);



};
