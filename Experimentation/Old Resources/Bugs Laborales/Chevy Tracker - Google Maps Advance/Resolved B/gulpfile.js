var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var uglify = require('gulp-uglify');
var dir;

gulp.task('build', ['setdir','imagemin','minifyhtml']);

gulp.task('setdir', function(cb) {
  try {
    dir = process.argv.slice(3);
    dir = dir.toString();
    dir = dir.replace('--','');
  } catch(e) {
    dir = '';
  }
  cb();
});

gulp.task('imagemin', ['setdir'], function () { 
  return gulp.src('published/'+dir+'/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('dist/'+dir));
});

gulp.task('minifyhtml', ['imagemin'], function() {
  gulp.src('published/'+dir+'/*.html')
    .pipe(htmlmin({
           collapseWhitespace: true,
           minifyJS: true
     }))
    .pipe(gulp.dest('dist/'+dir));
});