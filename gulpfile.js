var gulp = require('gulp'); 
var del = require('del'); 
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('clean',function(){
    return del(['dist/**/*']);
});

gulp.task('build',['sass','images'],function(){
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss') 
  .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
      
  }))
  .pipe(gulp.dest('dist/css'));
});

 
 gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

 gulp.task('default',['watch']);
 
 gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', ['build']);
});