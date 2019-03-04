module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  var localhostPort = '8080';

  grunt.initConfig({
    express: {
      all: {
        options: {
          bases: ['www'],
          port: localhostPort,
          hostname: "0.0.0.0",
          livereload: true,
          serverreload: false
        }
      }
    },
    less: {
      development: {
        options: {
          optimization: 2,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapFilename: "main.css.map"
        },
        files: {
          "www/css/main.css": "www/less/main.less" 
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'www/img/src/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'www/img/dist/'
        }]
      }
    },
    open: {
      dev: {
        path: 'http://localhost:' + localhostPort
      },
    },
    watch: {
      styles: {
        files: ['www/less/**/*.less'], 
        tasks: ['less'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['express', 'less', 'imagemin', 'open:dev', 'watch']);
};