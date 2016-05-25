module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    express: {
      all: {
        options: {
          bases: ['www'],
          port: 8080,
          hostname: "0.0.0.0",
          livereload: true,
          serverreload: false,
        }
      }
    },

    watch: {
      scripts: {
        files: ['www/css/*.scss','www/js/*js','www/index.html'],
        tasks: ['sass','uncss','autoprefixer','jshint','concat','uglify'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    devUpdate: {
      main: {
        options: {
          updateType: 'prompt', // Prompt user to confirm update of every package
          reportUpdated: false, // Don't report already updated packages
          semver: false, // Use package.json semver rules when updating
          packages: { // What packages to check
            devDependencies: true, // Outdated devDependencies are installed using the --save-dev option
            dependencies: false // Outdated dependencies are installed using the --save option
          },
          packageJson: null // Find package.json automatically
        }
      }
    },

    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
      },
      js: {
        files: [{
          cwd: 'www/dest/js/',
          expand: true,
          src: '*.js',
          dest: 'www/dest/js/'
        }]
      }
    },

    sprite:{
      all: {
        src: ['www/img/*.png', 'www/img/*.jpeg', 'www/img/*.jpg', 'www/img/*.svg'],
        dest: 'www/dest/img/sprite/spritesheet.png',
        destCss: 'www/css/sprite.scss'
      }
    },

    sass: {                              
      dist: {                            
        options: {                       
          style: 'expanded',
        },
        files: [{
          expand: true,
          cwd: 'www/css/',
          src: ['*.scss'],
          dest: 'www/dest/css/',
          ext: '.css'
        }]
      }
    },

    csslint: {
      strict: {
        options: {
          import: false
        },
        src: ['www/dest/css/*.css']
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 20 versions']
      },
      dist: { 
        files: {
          'www/dest/css/core.css': 'www/dest/css/core.css'
        }
      }
    },

    jshint: {
        all: ['Gruntfile.js','www/js/*.js']
    },

    wiredep: {
      task: {
        src: ['www/index.html'],
      }
    },

    open: {
      all: {
        path: 'http://localhost:8080/index.html'
      }
    },

    uncss: {
      dist: {
        files: {
          'www/dest/css/core.css': ['www/index.html'] 
        }
      }
    },

    clean: {
      sass: {
        src: ['.sass-cache/*']
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['www/js/models.js','www/js/*'],
        dest: 'www/dest/js/main.js'
      },
    },

  });

  grunt.registerTask('default', ['jshint','concat','uglify','sprite','sass','csslint','uncss','autoprefixer','clean','wiredep','express','open','watch']);
  grunt.registerTask('update', ['devUpdate']);

};