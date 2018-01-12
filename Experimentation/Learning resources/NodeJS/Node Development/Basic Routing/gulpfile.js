//Require the dev-dependencies
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
 
gulp.task('test', function() {
   return gulp.src('tests/*.js')
      .pipe(jasmine({verbose:true}));
});